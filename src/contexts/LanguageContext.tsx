
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations = {
  en: {
    // Navigation & Main Pages
    dashboard: 'Dashboard',
    review: 'Review Submissions',
    forms: 'Form Library',
    build: 'Build Form',
    settings: 'Global Settings',
    
    // Navigation items
    home: 'Home',
    
    // Language & Theme
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
    theme: 'Theme & Appearance',
    globalTheme: 'Global Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    brandIdentity: 'Brand Identity',
    languageSettings: 'Language Settings',
    selectLanguage: 'Select Language',
    languageDescription: 'Choose your preferred language for the application interface',
    themeDescription: 'Set the default theme for the entire application',
    
    // Form Builder
    formBuilder: 'Form Builder',
    formPreview: 'Form Preview',
    formSettings: 'Form Settings',
    saveForm: 'Save Form',
    publishForm: 'Publish Form',
    newForm: 'New Form',
    loadForm: 'Load Form',
    formTitle: 'Form Title',
    formDescription: 'Form Description',
    addField: 'Add Field',
    fieldType: 'Field Type',
    fieldLabel: 'Field Label',
    required: 'Required',
    optional: 'Optional',
    
    // Form Library
    drafts: 'Drafts',
    published: 'Published',
    templates: 'Templates',
    noForms: 'No forms available',
    createFirstForm: 'Create your first form to get started',
    
    // Submissions Review
    submissionsReview: 'Submissions',
    approvalPending: 'Approval Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    highRisk: 'High Risk',
    mediumRisk: 'Medium Risk',
    lowRisk: 'Low Risk',
    
    // Analytics
    analytics: 'Analytics',
    views: 'Views',
    completionRate: 'Completion Rate',
    averageTime: 'Average Time',
    reports: 'Reports',
    
    // Common UI
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    close: 'Close',
    confirm: 'Confirm',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    loading: 'Loading...',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    draftStatus: 'Draft',
    publishedStatus: 'Published',
    
    // Form Fields
    textField: 'Text Field',
    textarea: 'Text Area',
    selectField: 'Select Field',
    checkbox: 'Checkbox',
    radioButton: 'Radio Button',
    dateField: 'Date Field',
    fileUpload: 'File Upload',
    
    // Messages
    formSaved: 'Form saved successfully',
    formPublished: 'Form published successfully',
    formDeleted: 'Form deleted successfully',
    error: 'An error occurred',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    
    // Additional UI Elements
    share: 'Share',
    manage: 'Manage',
    formUrl: 'Form URL',
    embedCode: 'Embed Code',
    copy: 'Copy',
    copied: 'Copied!',
    urlCopied: 'Form URL copied to clipboard.',
    noDescription: 'No description',
    fields: 'fields',
    submissionsCount: 'submissions',
    deleteForm: 'Delete Form',
    confirmDelete: 'Are you sure you want to delete',
    cannotUndo: 'This action cannot be undone.',
    permanentDelete: 'This will permanently remove the form and all its submissions.',
    deleteDraft: 'Delete Draft',
    deletePublished: 'Delete Published Form',
    moveToPublished: 'Publish',
    moveToDraft: 'Draft'
  },
  ar: {
    // Navigation & Main Pages
    dashboard: 'لوحة التحكم',
    review: 'مراجعة المشاركات',
    forms: 'مكتبة النماذج',
    build: 'إنشاء نموذج',
    settings: 'الإعدادات العامة',
    
    // Navigation items
    home: 'الرئيسية',
    
    // Language & Theme
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
    theme: 'المظهر والثيم',
    globalTheme: 'الثيم العام',
    light: 'فاتح',
    dark: 'داكن',
    system: 'النظام',
    brandIdentity: 'هوية العلامة التجارية',
    languageSettings: 'إعدادات اللغة',
    selectLanguage: 'اختر اللغة',
    languageDescription: 'اختر لغتك المفضلة لواجهة التطبيق',
    themeDescription: 'تعيين الثيم الافتراضي للتطبيق بأكمله',
    
    // Form Builder
    formBuilder: 'منشئ النماذج',
    formPreview: 'معاينة النموذج',
    formSettings: 'إعدادات النموذج',
    saveForm: 'حفظ النموذج',
    publishForm: 'نشر النموذج',
    newForm: 'نموذج جديد',
    loadForm: 'تحميل النموذج',
    formTitle: 'عنوان النموذج',
    formDescription: 'وصف النموذج',
    addField: 'إضافة حقل',
    fieldType: 'نوع الحقل',
    fieldLabel: 'تسمية الحقل',
    required: 'مطلوب',
    optional: 'اختياري',
    
    // Form Library
    drafts: 'المسودات',
    published: 'المنشورة',
    templates: 'القوالب',
    noForms: 'لا توجد نماذج متاحة',
    createFirstForm: 'أنشئ نموذجك الأول للبدء',
    
    // Submissions Review
    submissionsReview: 'المشاركات',
    approvalPending: 'في انتظار الموافقة',
    approved: 'موافق عليها',
    rejected: 'مرفوضة',
    highRisk: 'مخاطرة عالية',
    mediumRisk: 'مخاطرة متوسطة',
    lowRisk: 'مخاطرة منخفضة',
    
    // Analytics
    analytics: 'التحليلات',
    views: 'المشاهدات',
    completionRate: 'معدل الإكمال',
    averageTime: 'الوقت المتوسط',
    reports: 'التقارير',
    
    // Common UI
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    close: 'إغلاق',
    confirm: 'تأكيد',
    search: 'بحث',
    filter: 'تصفية',
    export: 'تصدير',
    import: 'استيراد',
    loading: 'جاري التحميل...',
    
    // Status
    active: 'نشط',
    inactive: 'غير نشط',
    draftStatus: 'مسودة',
    publishedStatus: 'منشور',
    
    // Form Fields
    textField: 'حقل نص',
    textarea: 'منطقة نص',
    selectField: 'حقل اختيار',
    checkbox: 'مربع اختيار',
    radioButton: 'زر اختيار',
    dateField: 'حقل تاريخ',
    fileUpload: 'رفع ملف',
    
    // Messages
    formSaved: 'تم حفظ النموذج بنجاح',
    formPublished: 'تم نشر النموذج بنجاح',
    formDeleted: 'تم حذف النموذج بنجاح',
    error: 'حدث خطأ',
    success: 'نجح',
    warning: 'تحذير',
    info: 'معلومات',
    
    // Additional UI Elements
    share: 'مشاركة',
    manage: 'إدارة',
    formUrl: 'رابط النموذج',
    embedCode: 'كود التضمين',
    copy: 'نسخ',
    copied: 'تم النسخ!',
    urlCopied: 'تم نسخ رابط النموذج.',
    noDescription: 'لا يوجد وصف',
    fields: 'حقول',
    submissionsCount: 'مشاركات',
    deleteForm: 'حذف النموذج',
    confirmDelete: 'هل أنت متأكد من رغبتك في حذف',
    cannotUndo: 'لا يمكن التراجع عن هذا الإجراء.',
    permanentDelete: 'سيؤدي هذا إلى حذف النموذج وجميع مشاركاته نهائياً.',
    deleteDraft: 'حذف المسودة',
    deletePublished: 'حذف النموذج المنشور',
    moveToPublished: 'نشر',
    moveToDraft: 'مسودة'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('app-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app-language', language);
    
    // Update document direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
