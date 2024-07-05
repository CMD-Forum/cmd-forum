import { NextResponse, type NextRequest } from 'next/server';
import { verifyAccess, type ApiData } from '@vercel/flags';
 
export async function GET(request: NextRequest) {
    const access = await verifyAccess(request.headers.get('Authorization'));
    if (!access) return NextResponse.json(null, { status: 401 });
 
    return NextResponse.json<ApiData>({
        definitions: {
            showDevelopmentWarning: {
                description: 'Controls whether the development message at `/posts` is visible',
                origin: '',
                options: [
                { value: false, label: 'Off' },
                { value: true, label: 'On' },
                ],
            },
            enableSettings: {
                description: 'Controls whether the settings page is enabled',
                origin: '',
                options: [
                { value: false, label: 'Off' },
                { value: true, label: 'On' },
                ],
            },
            enableHomepage: {
                description: 'Controls whether the home page is enabled',
                origin: '',
                options: [
                { value: false, label: 'Off' },
                { value: true, label: 'On' },
                ],
            },
            enableMaintenanceBanner: {
                description: 'Controls whether the maintenance banner is visible',
                origin: '',
                options: [
                { value: false, label: 'Off' },
                { value: true, label: 'On' },
                ],
            },
        },
    });
}