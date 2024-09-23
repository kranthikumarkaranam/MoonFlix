<p align="center">
   <a href="https://github.com/kranthikumarkaranam/e-commerce_admin">
    <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109801522/265072469-bb3cbb5b-49fb-411e-9cbe-210ee6b23109.png" alt="logo" width="180" height="180">
  </a>
  
  <h1 align="center">E-Commerce Admin</h1>

  <p align="center">
Welcome to ADMIN, your ultimate store management solution! Easily handle multiple stores with features like Overview Charts 📊, Billboards 🏞️, Categories 📦, Products 🛒, and Orders 📋 management with store Settings ⚙️, and more. Our sleek UI offers light/dark modes and Clerk authentication for security 🔐. We use Prisma ORM for efficient database management and Next Cloudinary for image uploads 🖼️. Products are automatically archived upon purchase 💰, and you can feature them on your homepage with a simple click. So, why wait? Dive into ADMIN and take control of your stores like never before!
  </p>

</p>

<br>
<br>

<h2>📜 Table of Contents</h2>

- [🚀 Live Demo](#demo)
- [🖼️ Project Screenshots](#screenshots)
- [💡 Key Features](#features)
- [🛠️ Installation & Set Up](#installation)
- [🌱 Environment Variables](#env)
- [🏭 Building & Running for Production](#production)
- [💻 Tech Stack](#tech)
- [🍰 Contribution Guidelines](#contribution)
- [📝 Creating a Pull Request](#pull)
- [💖 Like my work?](#like)

<br>
<br>

<h2 id="demo">🚀 Live Demo</h2>

<p>Immerse yourself in its design and functionality with an interactive live demo — simply click the link to explore.</p>

**Live Preview** ➡️ [Demo](https://ecommerce-admin-kranthi.vercel.app)

<br>
<br>

<h2 id="screenshots">🖼️ Project Screenshots</h2>

<p>Feel free to check out the screenshots of my website for a sneak peek into its captivating user interface.</p>

<br>

<h3 align="center">⬅️ Overview ➡️</h3>

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109801522/265055123-3d6acb2a-6773-40b7-8938-d5cc81b14245.png" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ Billboards ➡️</h3>

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109801522/265055510-86e5cd0b-a09e-4f41-8420-48cb34990e3f.png" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ Categories ➡️</h3>

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109801522/265057395-5b0fd404-a2da-4e5b-85e8-44a69cdfcac6.png" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ Sizes ➡️</h3>

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109801522/265057222-a2a76f11-f1a4-4fe8-92c3-86e2d5feb7d4.png" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ Colors ➡️</h3>

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109801522/265057531-c839983d-787b-4033-8206-314c2c47c565.png" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ Products ➡️</h3>

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109801522/265057732-fd995659-412a-4435-a1a3-3dc1f2aecc41.png" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ Orders ➡️</h3>

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109801522/265057875-71bf131b-a2f0-43d1-a944-17925b93a308.png" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ Settings ➡️</h3>

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109801522/265058082-2faf3fcb-e401-42b7-abf7-a5b3daa507c3.png" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ Create Store ➡️</h3>

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109801522/265058178-e3b4528c-4d33-4b12-977a-eacfe210f49a.png" alt="screenshot" width="auto" height="auto">

<br>
<br>

<h2 id="features">💡 Key Features</h2>

**Here are some of the standout features of the project:**

- **Overview Charts** 📊: Gain insights into your store's performance with detailed charts and analytics.

- **Billboards** 🏞️: Showcase your products and promotions with eye-catching billboards on your store's homepage.

- **Categories** 📦: Organize your products into categories for easy navigation and better user experience.

- **Products** 🛒: Add, edit, and manage your product catalog effortlessly.

- **Orders** 📋: Streamline order processing and keep track of customer purchases.

- **Store Settings** ⚙️: Customize your store's settings to meet your specific requirements.

- **Light/Dark Modes** 🌗: Enjoy a sleek and customizable user interface with light and dark modes.

- **Clerk Authentication** 🔐: Ensure the security of your store with robust Clerk authentication.

- **Prisma ORM**: Utilize Prisma ORM for efficient and reliable database management.

- **Next Cloudinary Integration** 🖼️: Seamlessly upload and manage images for your products using Next Cloudinary.

- **Automatic Product Archiving** 💰: Products are automatically archived upon purchase to keep your catalog up to date.

- **Featured Products**: Easily feature products on your homepage with a simple click to boost sales.


_Take control of your stores like never before with ADMIN! Get started today and revolutionize your store management experience._

<br>
<br>

<h2 id="installation">🛠️ Installation & Set Up</h2>

**1. Clone the repository:**

```sh
git clone https://github.com/kranthikumarkaranam/e-commerce_admin.git
```

**2. Go to the project directory:**

```sh
cd e-commerce_admin
```

**3. Install dependencies using npm:**

```sh
npm install
```

**4. Applying Database Schema Changes with Prisma:**

> Before running this command, ensure you have set up Prisma by `npx prisma generate`.

```sh
npx prisma db push
```

**5. Start the development server:**

> Before starting the server add these _[env](#env)_ variables.

```sh
npm run dev
```

<br>
<br>

<h2 id="env">🌱 Environment Variables</h2>

> To run this project, you need to add the following environment variables to your `.env` file in the project's root directory.

> Also, feel free to take a look at the `.env.example` file _[here](https://github.com/kranthikumarkaranam/e-commerce_admin/blob/main/.env.example)_.

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`
- `DATABASE_URL`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `STRIPE_API_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `FRONTEND_STORE_URL`

<br>
<br>

<h2 id="production">🏭 Building & Running for Production</h2>

**1. Generate a full static production build:**

```sh
npm run build
```

**2. Preview the site as it will appear once deployed:**

```sh
npm run start
```

<br>
<br>

<h2 id="tech">💻 Tech Stack</h2>

**Technologies used in the project:**

- React.js
- NEXT.js
- TypeScript
- Tailwind CSS
- zod
- react-hot-toast
- shadcn/ui
- Radix UI
- Lucide React
- Next Cloudinary
- Clerk
- React Hook Form
- Prisma ORM
- Prisma Client
- React Table
- TanStack Table
- date-fns
- react-spinners
- Recharts
- Stripe
- axios
- zustand

<br>
<br>

<h2 id="contribution">🍰 Contribution Guidelines</h2>

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- See _[Contributing](https://github.com/kranthikumarkaranam/e-commerce_admin/blob/main/CONTRIBUTING.md)_ for ways to get started.
- If you have suggestions for adding or removing projects, feel free to _[open an issue](https://github.com/kranthikumarkaranam/e-commerce_admin/issues/new)_ to discuss it, or directly create a pull request by following the guidelines _[here](#pull)_.
- Please make sure you check your spelling and grammar.
- Create individual PR for each suggestion.
- Also, please read through the _[Code of Conduct](https://github.com/kranthikumarkaranam/e-commerce_admin/blob/main/CODE_OF_CONDUCT.md)_ before posting your first idea as well.

<br>
<br>

<h2 id="pull">📝 Creating a Pull Request</h2>

**Follow the steps below to Initiate a Pull Request**

1. Fork the repository
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br>
<br>

<h2 id="like">💖 Like my work?</h2>

Thank you for taking the time to explore the project. I hope it brings value and joy to those who use it.

If you require any help or have any questions, please don't hesitate to reach out to me _[here](mailto:2019271@iiitdmj.ac.in)_.

<br>
<br>
<br>

<h3 align="center">Made with ❤️ by KRANTHI.</h3>
