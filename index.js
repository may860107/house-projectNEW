import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'dd04z9gp',
  dataset: 'production',
  apiVersion: '2024-03-22',
  useCdn: true,
});

export default async function Page() {
  const houses = await client.fetch(`
    *[_type == "house"]{
      _id,
      title,
      location,
      price,
      layout,
      "imageUrl": mainImage.asset->url,
      tags
    }
  `) || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">之唯的不動產精選 🏡</h1>
          <a href="tel:0978816380" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
            📞 立即來電
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {houses.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              目前後台還沒有房屋資料，請去 Sanity 後台新增喔！
            </div>
          ) : (
            houses.map((house) => (
              <div key={house._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group">
                <div className="h-56 bg-gray-200 relative">
                  {house.imageUrl ? (
                    <img src={house.imageUrl} alt={house.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">暫無照片</div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {house.location}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{house.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{house.layout}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {house.tags?.map((tag, index) => (
                      <span key={index} className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-2">
                    <span className="text-xl font-bold text-red-500">${house.price.toLocaleString()} <span className="text-sm text-gray-400">/元</span></span>
                    <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                      查看詳情
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
