# Mero Tasbir

**Streamline services for the photography and event industry**

A comprehensive platform built with modern web technologies to help photography businesses manage their services, showcase their work, and streamline client bookings.

## 🎯 **What We Do:**

Mero Tasbir is a complete business solution for photographers and event professionals, providing:

- **📸 Photography Services Management** - Manage packages, pricing, and availability
- **🎉 Event Booking System** - Handle event photography bookings and scheduling
- **👥 Client Management** - Track clients, preferences, and booking history
- **🖼️ Portfolio Showcase** - Beautiful galleries to display your work
- **💰 Revenue Tracking** - Monitor bookings, payments, and business performance
- **📱 Client Website** - Professional online presence for your business

## 🏗️ **Architecture:**

This is a **monorepo** built with modern technologies:

```
mero-tasbir/
├── apps/
│   ├── admin/          # 🎛️ Business Management Dashboard
│   ├── web/            # 🌐 Client-Facing Website
│   └── api/            # ⚙️ Backend Services
├── packages/            # 📦 Shared Libraries & Configs
└── docs/               # 📚 Documentation
```

## 🚀 **Quick Start:**

### **For Business Owners:**
```bash
# Clone the repository
git clone https://github.com/theaavashh/mero-tasbir.git
cd mero-tasbir

# Start the client website
cd apps/web
pnpm install
pnpm run dev

# Start the admin dashboard
cd ../admin
pnpm install
pnpm run dev

# Start the backend API
cd ../api
pnpm install
pnpm run dev
```

### **For Developers:**
```bash
# Install all dependencies
pnpm install

# Run all services
pnpm run dev

# Build all projects
pnpm run build
```

## 🛠️ **Tech Stack:**

### **Frontend:**
- **Next.js** - React framework for web applications
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Custom UI Components** - Consistent design system

### **Backend:**
- **Express.js** - Node.js web framework
- **Prisma** - Modern database ORM
- **PostgreSQL** - Reliable database system
- **TypeScript** - Type-safe backend development

### **Development:**
- **pnpm** - Fast, disk space efficient package manager
- **Turbo** - High-performance build system
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting

## 📱 **Applications:**

### **1. Admin Dashboard** (`/apps/admin`)
- **Business Management** - Manage services, pricing, and staff
- **Booking Management** - Handle client appointments and events
- **Client Database** - Track client information and history
- **Revenue Analytics** - Monitor business performance
- **Portfolio Management** - Organize and showcase your work

**Access:** http://localhost:3000

### **2. Client Website** (`/apps/web`)
- **Service Showcase** - Display photography packages and pricing
- **Portfolio Gallery** - Beautiful photo collections
- **Online Booking** - Easy appointment scheduling
- **Client Testimonials** - Build trust with reviews
- **Contact & Inquiry** - Multiple ways to reach you

**Access:** http://localhost:3000

### **3. Backend API** (`/apps/api`)
- **RESTful API** - Handle all business operations
- **Database Management** - Secure data storage and retrieval
- **Authentication** - Secure user access control
- **Business Logic** - Core application functionality

**Access:** http://localhost:3001

## 🎨 **Design Philosophy:**

- **Professional Aesthetic** - Photography-focused design language
- **User Experience** - Intuitive interfaces for both staff and clients
- **Mobile First** - Responsive design for all devices
- **Performance** - Fast loading and smooth interactions
- **Accessibility** - Inclusive design for all users

## 📊 **Key Features:**

### **For Business Owners:**
- **Streamlined Operations** - Manage everything from one dashboard
- **Client Relationship Management** - Build lasting client relationships
- **Revenue Optimization** - Track and improve business performance
- **Professional Branding** - Consistent, professional online presence

### **For Clients:**
- **Easy Booking** - Simple online appointment scheduling
- **Transparent Pricing** - Clear service packages and costs
- **Portfolio Access** - See the quality of your work
- **Professional Experience** - Trustworthy, reliable service

## 🔐 **Security & Privacy:**

- **Secure Authentication** - Role-based access control
- **Data Protection** - Client information security
- **Regular Backups** - Data safety and recovery
- **Compliance** - Industry-standard security practices

## 🚀 **Getting Started:**

### **Prerequisites:**
- Node.js 18+ 
- pnpm package manager
- PostgreSQL database
- Git

### **Installation:**
```bash
# Clone the repository
git clone https://github.com/theaavashh/mero-tasbir.git
cd mero-tasbir

# Install dependencies
pnpm install

# Set up environment variables
cp apps/api/.env.example apps/api/.env
# Edit .env with your database credentials

# Start development
pnpm run dev
```

### **Database Setup with Prisma:**
```bash
# Navigate to API directory
cd apps/api

# Install Prisma dependencies
pnpm add @prisma/client
pnpm add -D prisma

# Initialize Prisma
npx prisma init

# Edit prisma/schema.prisma with your models
# Example schema:
# model User {
#   id        String   @id @default(cuid())
#   email     String   @unique
#   name      String?
#   createdAt DateTime @default(now())
#   updatedAt DateTime @updatedAt
# }

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed database with sample data
npx prisma db seed

# (Optional) Open Prisma Studio
npx prisma studio
```

### **Environment Variables:**
```bash
# apps/api/.env
DATABASE_URL="postgresql://username:password@localhost:5432/mero_tasbir_db"
NODE_ENV=development
PORT=3001
```

## 📈 **Roadmap:**

### **Phase 1 (Current):**
- ✅ Basic admin dashboard
- ✅ Client website
- ✅ Backend API
- ✅ Database setup

### **Phase 2 (Next):**
- 🔄 Advanced analytics
- 🔄 Payment integration
- 🔄 Email automation
- 🔄 Mobile app

### **Phase 3 (Future):**
- 📱 Native mobile applications
- 🤖 AI-powered recommendations
- 🌍 Multi-language support
- 🔗 Third-party integrations

## 🤝 **Contributing:**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Setup:**
```bash
# Fork the repository
# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
# Test thoroughly
# Submit a pull request
```

## 📄 **License:**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Support:**

- **Documentation:** Check our [docs](docs/) folder
- **Issues:** Report bugs on [GitHub Issues](https://github.com/theaavashh/mero-tasbir/issues)
- **Discussions:** Join the conversation on [GitHub Discussions](https://github.com/theaavashh/mero-tasbir/discussions)

## 🌟 **Why Mero Tasbir?**

**Built for photographers and event professionals who want to focus on their craft while we handle the business side.**

- **Save Time** - Automated booking and management
- **Increase Revenue** - Better client management and follow-up
- **Professional Image** - Consistent, beautiful online presence
- **Grow Your Business** - Scalable platform for business growth

---

**Where every moment becomes a masterpiece, and every event tells a story.** 📸✨

**Made with ❤️ for the photography community**
