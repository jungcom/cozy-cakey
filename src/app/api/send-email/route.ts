import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Order } from '@/lib/supabase';
import { BUSINESS_CONFIG } from '@/config/business';
import { formatDateInBusinessTimezone } from '@/utils/timezone';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { order }: { order: Order } = await request.json();

    if (!order) {
      return NextResponse.json({ error: 'Order data is required' }, { status: 400 });
    }

    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      
      try {
        // Parse date string as local date to avoid timezone issues
        const [year, month, day] = dateString.split('-').map(Number);
        if (year && month && day) {
          const date = new Date(year, month - 1, day);
          return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }
        return '';
      } catch (error) {
        console.error('Error formatting date:', error);
        return dateString; // fallback to original string
      }
    };

    const paymentMethod = order.payment_method === 'venmo' ? 
      `Venmo (${BUSINESS_CONFIG.payment.venmo.handle})` : 
      `Zelle (${BUSINESS_CONFIG.payment.zelle.phone}, ${BUSINESS_CONFIG.payment.zelle.name})`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #92400e; font-size: 28px; margin-bottom: 10px;">Order Confirmation</h1>
          <p style="color: #374151; font-size: 18px;">Thank you for your order!</p>
          <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <p style="color: #92400e; font-weight: bold; margin: 0;">Order ID: ${order.id}</p>
          </div>
        </div>

        <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
          <h2 style="color: #111827; font-size: 20px; margin-bottom: 15px;">Order Details</h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; font-size: 16px; margin-bottom: 10px;">${order.cake_name}</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 5px 0; color: #6b7280; width: 120px;">Size:</td>
                <td style="padding: 5px 0; color: #111827; font-weight: 500;">${order.size}"</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #6b7280;">Flavor:</td>
                <td style="padding: 5px 0; color: #111827; font-weight: 500;">${order.flavor}</td>
              </tr>
              ${order.base_color ? `
              <tr>
                <td style="padding: 5px 0; color: #6b7280;">Base Color:</td>
                <td style="padding: 5px 0; color: #111827; font-weight: 500;">${order.base_color}</td>
              </tr>
              ` : ''}
              ${order.lettering ? `
              <tr>
                <td style="padding: 5px 0; color: #6b7280;">Lettering:</td>
                <td style="padding: 5px 0; color: #111827; font-weight: 500;">"${order.lettering}"</td>
              </tr>
              ` : ''}
              ${order.lettering_color ? `
              <tr>
                <td style="padding: 5px 0; color: #6b7280;">Lettering Color:</td>
                <td style="padding: 5px 0; color: #111827; font-weight: 500;">${order.lettering_color}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 15px; margin-bottom: 15px;">
            <h4 style="color: #111827; font-size: 16px; margin-bottom: 10px;">
              ${order.delivery_option === 'delivery' ? 'Delivery' : 'Pickup'} Information
            </h4>
            <p style="color: #374151; margin: 5px 0;">
              <strong>Date:</strong> ${formatDate(order.delivery_date)}
            </p>
            <p style="color: #374151; margin: 5px 0;">
              <strong>Time:</strong> ${order.pickup_time}
            </p>
            ${order.delivery_option === 'delivery' && order.address ? `
            <p style="color: #374151; margin: 5px 0;">
              <strong>Address:</strong> ${order.address}
            </p>
            ` : ''}
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
            <h4 style="color: #111827; font-size: 16px; margin-bottom: 10px;">Payment Information</h4>
            <p style="color: #374151; margin: 5px 0;">
              <strong>Method:</strong> ${paymentMethod}
            </p>
            <p style="color: #d97706; font-size: 18px; font-weight: bold; margin: 10px 0;">
              Total: $${order.total_price}
            </p>
          </div>

          ${order.questions_comments ? `
          <div style="border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 15px;">
            <h4 style="color: #111827; font-size: 16px; margin-bottom: 10px;">Special Requests</h4>
            <p style="color: #374151; background-color: #f3f4f6; padding: 10px; border-radius: 4px; margin: 0;">
              ${order.questions_comments}
            </p>
          </div>
          ` : ''}
        </div>

        <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
          <h3 style="color: #92400e; font-size: 16px; margin-bottom: 15px;">What's Next?</h3>
          <ul style="color: #92400e; margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 5px;">We'll contact you within 24 hours to confirm your order</li>
            <li style="margin-bottom: 5px;">Please send payment via ${paymentMethod}</li>
            <li style="margin-bottom: 5px;">We'll send updates via email, phone, or Instagram</li>
            <li style="margin-bottom: 5px;">Your cake will be ready for ${order.delivery_option} on ${formatDate(order.delivery_date)}</li>
          </ul>
        </div>

        <div style="text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
          <p>Thank you for choosing Cozy Cakey!</p>
          <p>If you have any questions, please contact us via phone, email, or Instagram.</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Cozy Cakey <onboarding@resend.dev>',
      to: [order.email],
      subject: `Order Confirmation - ${order.cake_name} (Order #${order.id})`,
      html: emailHtml,
    });

    if (error) {
      console.error('Email sending error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}