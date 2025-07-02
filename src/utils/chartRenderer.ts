
export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'donut';
  title: string;
  data: any[];
}

export class ChartRenderer {
  private static createCanvas(width: number = 800, height: number = 400): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
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

      // Set white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw title
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(chartData.title, canvas.width / 2, 40);

      const chartArea = {
        x: 80,
        y: 80,
        width: canvas.width - 160,
        height: canvas.height - 160
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

      // Convert to base64
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    });
  }

  private static drawBarChart(ctx: CanvasRenderingContext2D, data: any[], area: any) {
    const colors = ['#70CDFF', '#39A8F7', '#0C75D1', '#C474F2', '#042C75'];
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = area.width / data.length * 0.8;
    const barSpacing = area.width / data.length * 0.2;

    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * area.height * 0.8;
      const x = area.x + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = area.y + area.height - barHeight;

      // Draw bar
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value label
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5);

      // Draw name label
      ctx.fillText(item.name, x + barWidth / 2, area.y + area.height + 20);
    });
  }

  private static drawLineChart(ctx: CanvasRenderingContext2D, data: any[], area: any) {
    const maxValue = Math.max(...data.map(d => d.value));
    const points: Array<{x: number, y: number}> = [];

    // Calculate points
    data.forEach((item, index) => {
      const x = area.x + (index / (data.length - 1)) * area.width;
      const y = area.y + area.height - (item.value / maxValue) * area.height * 0.8;
      points.push({ x, y });
    });

    // Draw line
    ctx.strokeStyle = '#39A8F7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    // Draw points and labels
    points.forEach((point, index) => {
      // Draw point
      ctx.fillStyle = '#0C75D1';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Draw labels
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(data[index].value.toString(), point.x, point.y - 10);
      ctx.fillText(data[index].name, point.x, area.y + area.height + 20);
    });
  }

  private static drawPieChart(ctx: CanvasRenderingContext2D, data: any[], area: any, isDonut: boolean = false) {
    const colors = ['#70CDFF', '#39A8F7', '#0C75D1', '#C474F2', '#042C75'];
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const centerX = area.x + area.width / 2;
    const centerY = area.y + area.height / 2;
    const radius = Math.min(area.width, area.height) / 2 * 0.8;
    const innerRadius = isDonut ? radius * 0.5 : 0;

    let currentAngle = -Math.PI / 2;

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      const color = colors[index % colors.length];

      // Draw slice
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      // Draw inner circle for donut
      if (isDonut) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Draw label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + Math.cos(labelAngle) * labelRadius;
      const labelY = centerY + Math.sin(labelAngle) * labelRadius;
      
      const percentage = ((item.value / total) * 100).toFixed(1);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${percentage}%`, labelX, labelY);

      currentAngle += sliceAngle;
    });

    // Draw legend
    const legendX = area.x + area.width + 20;
    let legendY = area.y + 20;
    
    data.forEach((item, index) => {
      const color = colors[index % colors.length];
      
      // Legend color box
      ctx.fillStyle = color;
      ctx.fillRect(legendX, legendY, 15, 15);
      
      // Legend text
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(item.name, legendX + 20, legendY + 12);
      
      legendY += 25;
    });
  }
}
