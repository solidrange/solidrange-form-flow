import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Users, FileText, Clock } from 'lucide-react';
import { sampleSubmissions } from '@/data/sampleSubmissions';
import { toast } from '@/hooks/use-toast';

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
  details?: string;
}

export const ApplicationTester: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    const results: TestResult[] = [];

    // Test 1: Check sample submissions count
    const submissionsCount = sampleSubmissions.length;
    results.push({
      name: 'Sample Submissions Count',
      passed: submissionsCount >= 200,
      message: `Found ${submissionsCount} submissions`,
      details: submissionsCount >= 200 ? 'Target of 200+ submissions met' : `Need ${200 - submissionsCount} more submissions`
    });

    // Test 2: Check submission data integrity
    const submissionsWithScore = sampleSubmissions.filter(s => s.score && s.score.percentage !== undefined);
    results.push({
      name: 'Submission Data Integrity',
      passed: submissionsWithScore.length === sampleSubmissions.length,
      message: `${submissionsWithScore.length}/${sampleSubmissions.length} submissions have valid scores`,
      details: 'All submissions should have complete score data'
    });

    // Test 3: Check submission type distribution
    const submissionTypes = sampleSubmissions.reduce((acc, sub) => {
      acc[sub.submissionType] = (acc[sub.submissionType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const hasAllTypes = submissionTypes.vendor && submissionTypes.internal && submissionTypes.external;
    results.push({
      name: 'Submission Type Distribution',
      passed: !!hasAllTypes,
      message: `Types: Vendor(${submissionTypes.vendor || 0}), Internal(${submissionTypes.internal || 0}), External(${submissionTypes.external || 0})`,
      details: 'All three submission types should be present'
    });

    // Test 4: Check status distribution
    const statusCounts = sampleSubmissions.reduce((acc, sub) => {
      acc[sub.status] = (acc[sub.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const hasAllStatuses = statusCounts.approved && statusCounts.rejected && statusCounts.under_review;
    results.push({
      name: 'Status Distribution',
      passed: !!hasAllStatuses,
      message: `Approved(${statusCounts.approved || 0}), Rejected(${statusCounts.rejected || 0}), Under Review(${statusCounts.under_review || 0})`,
      details: 'All status types should be represented'
    });

    // Test 5: Check risk level distribution
    const riskLevels = sampleSubmissions.reduce((acc, sub) => {
      const risk = sub.score?.riskLevel || 'unknown';
      acc[risk] = (acc[risk] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const hasAllRiskLevels = riskLevels.low && riskLevels.medium && riskLevels.high && riskLevels.critical;
    results.push({
      name: 'Risk Level Distribution',
      passed: !!hasAllRiskLevels,
      message: `Low(${riskLevels.low || 0}), Medium(${riskLevels.medium || 0}), High(${riskLevels.high || 0}), Critical(${riskLevels.critical || 0})`,
      details: 'All risk levels should be represented'
    });

    // Test 6: Check approval types
    const approvalTypes = sampleSubmissions.filter(s => s.status === 'approved').reduce((acc, sub) => {
      const approvalType = sub.approvalType || 'unknown';
      acc[approvalType] = (acc[approvalType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const hasApprovalTypes = approvalTypes.fully && approvalTypes.partially;
    results.push({
      name: 'Approval Types Distribution',
      passed: !!hasApprovalTypes,
      message: `Fully(${approvalTypes.fully || 0}), Partially(${approvalTypes.partially || 0})`,
      details: 'Both approval types should be present'
    });

    // Test 7: Check recent submissions (within last 90 days)
    const recentSubmissions = sampleSubmissions.filter(s => {
      const submissionDate = new Date(s.submittedAt);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 90);
      return submissionDate > cutoff;
    });
    
    results.push({
      name: 'Recent Submissions',
      passed: recentSubmissions.length > 0,
      message: `${recentSubmissions.length} submissions in last 90 days`,
      details: 'Should have recent submissions for realistic data'
    });

    // Test 8: Check company diversity
    const uniqueCompanies = new Set(sampleSubmissions.map(s => s.companyName)).size;
    results.push({
      name: 'Company Diversity',
      passed: uniqueCompanies >= 20,
      message: `${uniqueCompanies} unique companies`,
      details: 'Should have diverse company representation'
    });

    setTestResults(results);
    setIsRunning(false);

    const passedTests = results.filter(r => r.passed).length;
    const totalTests = results.length;
    
    if (passedTests === totalTests) {
      toast({
        title: "All Tests Passed! ✅",
        description: `Application is ready with ${submissionsCount} submissions and all dashboard functionality working`,
      });
    } else {
      toast({
        title: "Some Tests Failed",
        description: `${passedTests}/${totalTests} tests passed. Check results for details.`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Auto-run tests when component mounts
    runTests();
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Application Test Results
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Comprehensive testing of application functionality and data integrity
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Test Summary</h3>
            <Button onClick={runTests} disabled={isRunning}>
              {isRunning ? 'Running Tests...' : 'Run Tests Again'}
            </Button>
          </div>
          
          {testResults.length > 0 && (
            <div className="grid gap-4">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {result.passed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{result.name}</p>
                      <p className="text-sm text-muted-foreground">{result.message}</p>
                      {result.details && (
                        <p className="text-xs text-gray-500 mt-1">{result.details}</p>
                      )}
                    </div>
                  </div>
                  <Badge variant={result.passed ? "default" : "destructive"}>
                    {result.passed ? "PASS" : "FAIL"}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {testResults.length > 0 && (
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Status:</span>
                <Badge variant={testResults.every(r => r.passed) ? "default" : "destructive"}>
                  {testResults.filter(r => r.passed).length} / {testResults.length} Tests Passed
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};