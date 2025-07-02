
export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'donut';
  title: string;
  data: any[];
}

export class ChartRenderer {
  private static createCanvas(width: number = 1200, height: number = 800): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    // Use device pixel ratio for high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    return canvas;
  }

  static async renderChart(chartData: ChartData): Promise<string> {
    return new Promise((resolve) => {
      const canvas = this.createCanvas();
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve('');
        return;
      }

      // Enhanced gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height / (window.devicePixelRatio || 1));
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, '#f8fafc');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

      // Improve text rendering
      ctx.textBaseline = 'middle';
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw enhanced title with gradient
      const titleGradient = ctx.createLinearGradient(0, 30, 0, 70);
      titleGradient.addColorStop(0, '#1e40af');
      titleGradient.addColorStop(1, '#7c3aed');
      ctx.fillStyle = titleGradient;
      ctx.font = 'bold 36px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(chartData.title, 600, 50);

      const chartArea = {
        x: 120,
        y: 100,
        width: 960,
        height: 580
      };

      switch (chartData.type) {
        case 'bar':
          this.drawBarChart(ctx, chartData.data, chartArea);
          break;
        case 'line':
          this.drawLineChart(ctx, chartData.data, chartArea);
          break;
        case 'pie':
        case 'donut':
          this.drawPieChart(ctx, chartData.data, chartArea, chartData.type === 'donut');
          break;
      }

      // Add enhanced border with gradient
      const borderGradient = ctx.createLinearGradient(0, 0, 1200, 800);
      borderGradient.addColorStop(0, '#3b82f6');
      borderGradient.addColorStop(0.5, '#8b5cf6');
      borderGradient.addColorStop(1, '#06b6d4');
      ctx.strokeStyle = borderGradient;
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, 1180, 780);

      // Convert to high-quality base64
      const dataURL = canvas.toDataURL('image/png', 1.0);
      resolve(dataURL);
    });
  }

  private static drawBarChart(ctx: CanvasRenderingContext2D, data: any[], area: any) {
    // Vibrant color palette with gradients
    const colors = [
      ['#FF6B6B', '#FF8E53'], // Coral to Orange
      ['#4ECDC4', '#44A08D'], // Turquoise to Teal
      ['#45B7D1', '#2196F3'], // Light Blue to Blue
      ['#96CEB4', '#6AB04C'], // Mint to Green
      ['#FFEAA7', '#FDCB6E'], // Light Yellow to Yellow
      ['#DDA0DD', '#A8E6CF'], // Plum to Light Green
      ['#98D8C8', '#88D8A3'], // Seafoam to Light Green
      ['#F7DC6F', '#F39C12'], // Golden to Orange
      ['#BB8FCE', '#9B59B6'], // Lavender to Purple
      ['#85C1E9', '#3498DB']  // Sky Blue to Blue
    ];
    
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = (area.width / data.length) * 0.7;
    const barSpacing = (area.width / data.length) * 0.3;

    // Draw enhanced grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = area.y + (area.height * i / 5);
      ctx.beginPath();
      ctx.moveTo(area.x, y);
      ctx.lineTo(area.x + area.width, y);
      ctx.stroke();
    }

    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * area.height * 0.8;
      const x = area.x + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = area.y + area.height - barHeight;

      // Draw bar with enhanced gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      const colorPair = colors[index % colors.length];
      gradient.addColorStop(0, colorPair[0]);
      gradient.addColorStop(1, colorPair[1]);
      
      ctx.fillStyle = gradient;
      
      // Add rounded corners
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, [8, 8, 0, 0]);
      ctx.fill();

      // Add subtle shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;
      ctx.fill();
      ctx.shadowColor = 'transparent';

      // Draw enhanced value label
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 18px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.value.toString(), x + barWidth / 2, y - 20);

      // Draw enhanced name label
      ctx.font = '16px Inter, Arial, sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText(item.name, x + barWidth / 2, area.y + area.height + 35);
    });

    // Draw enhanced Y-axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '14px Inter, Arial, sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = (maxValue * i / 5).toFixed(0);
      const y = area.y + area.height - (area.height * i / 5);
      ctx.fillText(value, area.x - 15, y);
    }
  }

  private static drawLineChart(ctx: CanvasRenderingContext2D, data: any[], area: any) {
    const maxValue = Math.max(...data.map(d => d.value));
    const points: Array<{x: number, y: number}> = [];

    // Draw enhanced grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = area.y + (area.height * i / 5);
      ctx.beginPath();
      ctx.moveTo(area.x, y);
      ctx.lineTo(area.x + area.width, y);
      ctx.stroke();
    }

    // Calculate points
    data.forEach((item, index) => {
      const x = area.x + (index / (data.length - 1)) * area.width;
      const y = area.y + area.height - (item.value / maxValue) * area.height * 0.8;
      points.push({ x, y });
    });

    // Draw line with enhanced gradient
    const lineGradient = ctx.createLinearGradient(0, area.y, 0, area.y + area.height);
    lineGradient.addColorStop(0, '#3b82f6');
    lineGradient.addColorStop(0.5, '#8b5cf6');
    lineGradient.addColorStop(1, '#06b6d4');
    
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Add shadow to line
    ctx.shadowColor = 'rgba(59, 130, 246, 0.3)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
    
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
    ctx.shadowColor = 'transparent';

    // Draw enhanced points and labels
    points.forEach((point, index) => {
      // Draw outer ring
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw inner circle with gradient
      const pointGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 8);
      pointGradient.addColorStop(0, '#ff6b6b');
      pointGradient.addColorStop(1, '#ee5a52');
      ctx.fillStyle = pointGradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
      ctx.fill();

      // Draw enhanced labels
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 16px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(data[index].value.toString(), point.x, point.y - 25);
      ctx.font = '14px Inter, Arial, sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText(data[index].name, point.x, area.y + area.height + 35);
    });
  }

  private static drawPieChart(ctx: CanvasRenderingContext2D, data: any[], area: any, isDonut: boolean = false) {
    // Enhanced vibrant color palette
    const colors = [
      ['#FF6B6B', '#FF8E53'], // Coral to Orange
      ['#4ECDC4', '#44A08D'], // Turquoise to Teal
      ['#45B7D1', '#2196F3'], // Light Blue to Blue
      ['#96CEB4', '#6AB04C'], // Mint to Green
      ['#FFEAA7', '#FDCB6E'], // Light Yellow to Yellow
      ['#DDA0DD', '#A8E6CF'], // Plum to Light Green
      ['#98D8C8', '#88D8A3'], // Seafoam to Light Green
      ['#F7DC6F', '#F39C12'], // Golden to Orange
      ['#BB8FCE', '#9B59B6'], // Lavender to Purple
      ['#85C1E9', '#3498DB']  // Sky Blue to Blue
    ];
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const centerX = area.x + area.width / 2;
    const centerY = area.y + area.height / 2;
    const radius = Math.min(area.width, area.height) / 2 * 0.7;
    const innerRadius = isDonut ? radius * 0.4 : 0;

    let currentAngle = -Math.PI / 2;

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      const colorPair = colors[index % colors.length];

      // Draw slice with enhanced gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, radius);
      gradient.addColorStop(0, colorPair[0]);
      gradient.addColorStop(1, colorPair[1]);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      // Add enhanced border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw inner circle for donut with gradient
      if (isDonut) {
        const innerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, innerRadius);
        innerGradient.addColorStop(0, '#ffffff');
        innerGradient.addColorStop(1, '#f8fafc');
        ctx.fillStyle = innerGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Draw enhanced percentage label
      if (sliceAngle > 0.2) {
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelRadius = radius * (isDonut ? 0.7 : 0.6);
        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;
        
        const percentage = ((item.value / total) * 100).toFixed(1);
        
        // Add text shadow
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 4;
        ctx.font = 'bold 18px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.strokeText(`${percentage}%`, labelX, labelY);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${percentage}%`, labelX, labelY);
      }

      currentAngle += sliceAngle;
    });

    // Draw enhanced legend
    const legendX = area.x + area.width + 60;
    let legendY = area.y + 60;
    
    ctx.font = 'bold 20px Inter, Arial, sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'left';
    ctx.fillText('Legend', legendX, legendY);
    legendY += 40;
    
    data.forEach((item, index) => {
      const colorPair = colors[index % colors.length];
      
      // Enhanced legend color box with gradient
      const legendGradient = ctx.createLinearGradient(legendX, legendY - 12, legendX + 24, legendY + 12);
      legendGradient.addColorStop(0, colorPair[0]);
      legendGradient.addColorStop(1, colorPair[1]);
      ctx.fillStyle = legendGradient;
      ctx.fillRect(legendX, legendY - 12, 24, 24);
      
      // Add border to legend box
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.strokeRect(legendX, legendY - 12, 24, 24);
      
      // Enhanced legend text
      ctx.fillStyle = '#1e293b';
      ctx.font = '16px Inter, Arial, sans-serif';
      ctx.fillText(`${item.name} (${item.value})`, legendX + 35, legendY);
      
      legendY += 35;
    });
  }
}
