import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export const prismaClient = new PrismaClient();

async function main() {
   // Create an admin user
   await prismaClient.user.create({
      data: {
         full_name: 'Admin User',
         username: 'admin',
         email: 'admin@example.com',
         password: await bcrypt.hash('admin', 10),
         role: 'ADMIN',
      },
   });

   // Create multiple tourist attractions
   const user = await prismaClient.user.findUnique({
      where: { username: 'admin' },
   });

   if (user) {
      await prismaClient.touristAttraction.createMany({
         data: [
            {
               user_id: user.id,
               thumbnail: 'https://example.com/thumbnail1.jpg',
               name: 'Pantai Bali',
               description:
                  'Pantai yang indah di Bali dengan pasir putih dan pemandangan matahari terbenam yang menakjubkan. Tempat yang sempurna untuk bersantai dan menikmati keindahan alam.',
               entrance_fee: 15000,
               category: 'Pantai',
               tags: ['pantai', 'matahari terbenam', 'bali'],
               address: 'Jl. Pantai Kuta, Kuta',
               city: 'Denpasar',
               province: 'Bali',
               country: 'Indonesia',
               postal_code: '80361',
               latitude: -8.7197,
               longitude: 115.1698,
            },
            {
               user_id: user.id,
               thumbnail: 'https://example.com/thumbnail2.jpg',
               name: 'Candi Borobudur',
               description:
                  'Candi Buddha bersejarah yang terkenal di dunia, dibangun pada abad ke-9. Tempat ini menawarkan pemandangan yang spektakuler dan pengalaman spiritual yang mendalam.',
               entrance_fee: 25000,
               category: 'Candi',
               tags: ['candi', 'sejarah', 'borobudur'],
               address: 'Jl. Badrawati, Borobudur',
               city: 'Magelang',
               province: 'Jawa Tengah',
               country: 'Indonesia',
               postal_code: '56553',
               latitude: -7.6079,
               longitude: 110.2038,
            },
            {
               user_id: user.id,
               thumbnail: 'https://example.com/thumbnail3.jpg',
               name: 'Taman Nasional Komodo',
               description:
                  'Rumah bagi komodo, kadal terbesar di dunia. Taman nasional ini juga menawarkan keindahan alam yang memukau dan kehidupan laut yang kaya.',
               entrance_fee: 10000,
               category: 'Taman Nasional',
               tags: ['satwa liar', 'komodo', 'alam'],
               address: 'Komodo',
               city: 'Labuan Bajo',
               province: 'Nusa Tenggara Timur',
               country: 'Indonesia',
               postal_code: '86754',
               latitude: -8.5661,
               longitude: 119.4805,
            },
            {
               user_id: user.id,
               thumbnail: 'https://example.com/thumbnail4.jpg',
               name: 'Tana Toraja',
               description:
                  'Kawasan dengan budaya unik dan rumah adat tradisional. Tana Toraja terkenal dengan upacara kematian yang megah dan rumah adat Tongkonan.',
               entrance_fee: 12000,
               category: 'Budaya',
               tags: ['budaya', 'tradisi', 'toraja'],
               address: 'Tana Toraja',
               city: 'Makale',
               province: 'Sulawesi Selatan',
               country: 'Indonesia',
               postal_code: '91811',
               latitude: -3.0658,
               longitude: 119.8225,
            },
            {
               user_id: user.id,
               thumbnail: 'https://example.com/thumbnail5.jpg',
               name: 'Gunung Bromo',
               description:
                  'Gunung berapi aktif di Jawa Timur. Menawarkan pemandangan matahari terbit yang menakjubkan dari puncaknya dan lanskap vulkanik yang mempesona.',
               entrance_fee: 20000,
               category: 'Gunung',
               tags: ['gunung', 'vulkan', 'bromo'],
               address: 'Taman Nasional Bromo Tengger Semeru',
               city: 'Probolinggo',
               province: 'Jawa Timur',
               country: 'Indonesia',
               postal_code: '67254',
               latitude: -7.9425,
               longitude: 112.953,
            },
            {
               user_id: user.id,
               thumbnail: 'https://example.com/thumbnail6.jpg',
               name: 'Raja Ampat',
               description:
                  'Surga bagi para penyelam dengan keanekaragaman hayati laut yang luar biasa. Pulau-pulau di Raja Ampat menawarkan pemandangan bawah laut yang menakjubkan.',
               entrance_fee: 30000,
               category: 'Pulau',
               tags: ['menyelam', 'pulau', 'raja ampat'],
               address: 'Raja Ampat',
               city: 'Waisai',
               province: 'Papua Barat',
               country: 'Indonesia',
               postal_code: '98482',
               latitude: -0.2337,
               longitude: 130.5228,
            },
            {
               user_id: user.id,
               thumbnail: 'https://example.com/thumbnail7.jpg',
               name: 'Hutan Monyet Ubud',
               description:
                  'Cagar alam yang sakral dan rumah bagi ratusan monyet. Tempat ini juga menawarkan suasana hutan tropis yang sejuk dan asri.',
               entrance_fee: 5000,
               category: 'Cagar Alam',
               tags: ['monyet', 'hutan', 'ubud'],
               address: 'Jl. Monkey Forest, Ubud',
               city: 'Ubud',
               province: 'Bali',
               country: 'Indonesia',
               postal_code: '80571',
               latitude: -8.5198,
               longitude: 115.2603,
            },
            {
               user_id: user.id,
               thumbnail: 'https://example.com/thumbnail8.jpg',
               name: 'Danau Toba',
               description:
                  'Danau vulkanik terbesar di dunia, terbentuk dari letusan gunung berapi super. Danau ini menawarkan pemandangan yang indah dan pulau di tengahnya, Pulau Samosir.',
               entrance_fee: 8000,
               category: 'Danau',
               tags: ['danau', 'vulkan', 'toba'],
               address: 'Danau Toba',
               city: 'Parapat',
               province: 'Sumatra Utara',
               country: 'Indonesia',
               postal_code: '21174',
               latitude: 2.688,
               longitude: 98.8753,
            },
            {
               user_id: user.id,
               thumbnail: 'https://example.com/thumbnail9.jpg',
               name: 'Sawah Terasering Jatiluwih',
               description:
                  'Situs Warisan Dunia UNESCO dengan pemandangan sawah terasering yang menakjubkan. Tempat ini menawarkan pengalaman budaya pertanian Bali yang autentik.',
               entrance_fee: 7000,
               category: 'Sawah Terasering',
               tags: ['sawah terasering', 'unesco', 'jatiluwih'],
               address: 'Jatiluwih',
               city: 'Tabanan',
               province: 'Bali',
               country: 'Indonesia',
               postal_code: '82152',
               latitude: -8.3737,
               longitude: 115.1425,
            },
            {
               user_id: user.id,
               thumbnail: 'https://example.com/thumbnail10.jpg',
               name: 'Taman Nasional Tanjung Puting',
               description:
                  'Sanctuary orangutan dengan hutan tropis yang luas. Pengunjung dapat melihat orangutan di habitat aslinya dan menikmati keindahan alam.',
               entrance_fee: 25000,
               category: 'Taman Nasional',
               tags: ['orangutan', 'satwa liar', 'tanjung puting'],
               address: 'Tanjung Puting',
               city: 'Pangkalan Bun',
               province: 'Kalimantan Tengah',
               country: 'Indonesia',
               postal_code: '74181',
               latitude: -2.7258,
               longitude: 111.3541,
            },
         ],
      });
   }
}

main()
   .catch((error) => {
      console.error(error);
      process.exit(1);
   })
   .finally(async () => {
      await prismaClient.$disconnect();
   });