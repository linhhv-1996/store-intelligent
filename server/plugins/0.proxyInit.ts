import { initializeProxyList } from '~/libs/proxyManager.js';

export default defineNitroPlugin(async (nitroApp) => {
  // Chỉ chạy khi build (production) hoặc khi chạy start
  // Bỏ qua khi đang `npm run dev` để đỡ tốn proxy/IP
//   if (process.env.NODE_ENV === 'development') {
//     console.log('⚠️ Bỏ qua khởi tạo proxy ở môi trường DEV.');
//     return;
//   }

  console.log('Khởi tạo danh sách proxy...');
  await initializeProxyList();
});
