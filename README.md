# alnasirlifestyle E-Commerce Clone

A modern, fully responsive e-commerce website clone of alnasirlifestyle.com built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design matching the original alnasirlifestyle website
- **Product Catalog**: Browse products with filtering and categorization
- **Product Details**: Detailed product pages with image galleries, size/color selection
- **Shopping Cart**: Full cart functionality with quantity management
- **User Authentication**: Login, register, logout with Laravel Sanctum integration
- **Corporate Solutions**: Dedicated page for bulk/corporate orders
- **Responsive Design**: Mobile-first approach, works on all devices
- **Fast Performance**: Built with Next.js 14 for optimal performance
- **Type-Safe**: Full TypeScript implementation

## 📦 Pages Included

- **Home**: Hero section, categories, new arrivals, featured products
- **Shop**: Product listing with filters and search
- **Product Detail**: Individual product pages with full details
- **Cart**: Shopping cart management
- **Account**: User profile and account management
- **About Us**: Company information and values
- **Contact**: Contact form and information
- **Corporate**: Bulk order and corporate solutions page

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment Ready**: Vercel, Netlify, or any Node.js host

## 🏃 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── shop/              # Shop page
│   ├── product/[id]/      # Product detail pages
│   ├── cart/              # Shopping cart
│   ├── about-us/          # About page
│   ├── contact-us/        # Contact page
│   └── corporate/         # Corporate solutions
├── components/            # React components
│   ├── Header.tsx         # Site header
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Hero section
│   ├── Categories.tsx     # Category grid
│   ├── ProductCard.tsx    # Product card component
│   ├── ProductGrid.tsx    # Product grid layout
│   └── CorporateBanner.tsx # Corporate CTA banner
├── lib/                   # Utility functions and data
│   └── products.ts        # Sample product data
└── public/               # Static assets

```

## 🎨 Customization

### Colors

The project uses Tailwind CSS. To customize colors, you can modify the classes in components:

- Primary: `blue-600`
- Secondary: `purple-600`
- Accent: `gray-900`

### Products

Sample products are defined in `lib/products.ts`. You can:
- Add more products
- Connect to a real API
- Integrate with a CMS

### Styling

All components use Tailwind CSS utility classes. Global styles are in `app/globals.css`.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Other Platforms

Build the project:
```bash
npm run build
```

## 🔐 Authentication

The application includes user authentication integrated with Laravel Sanctum:

- **Login/Register**: Modal forms accessible from the header
- **Token Management**: Automatic token storage and API requests
- **Protected Routes**: Account page requires authentication
- **Logout**: Secure token revocation

### Environment Setup

Add to your `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
```

Make sure your Laravel backend has Sanctum configured and the API endpoints match the documentation.

- [x] User authentication
- [ ] Payment integration
- [ ] Order management
- [ ] Product reviews
- [ ] Wishlist functionality
- [ ] Search functionality
- [ ] API integration
- [ ] Admin dashboard

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify as needed.

## 📄 License

This is a clone for educational/demonstration purposes.

## 🙏 Acknowledgments

- Original design inspiration: [alnasirlifestyle.com](https://alnasirlifestyle.com)
- Built with [Next.js](https://nextjs.org)
- Icons by [Lucide](https://lucide.dev)

---

Built with ❤️ using Next.js 14

