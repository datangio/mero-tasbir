# HeroSection Component

A reusable hero section component for wedding and event photography websites.

## Features

- ✅ Fully responsive design
- ✅ Animated text rotation
- ✅ Event showcase with images
- ✅ Configurable image sources via props
- ✅ Fallback to default external images
- ✅ TypeScript support

## Usage

### Basic Usage (with default images)

```tsx
import { HeroSection } from '@repo/ui';

const MyPage = () => {
  const handleGetStarted = () => {
    console.log('Get started clicked!');
  };

  return (
    <HeroSection onGetStarted={handleGetStarted} />
  );
};
```

### With Custom Images from Your App's Public Folder

```tsx
import { HeroSection } from '@repo/ui';

const MyPage = () => {
  const handleGetStarted = () => {
    console.log('Get started clicked!');
  };

  const eventImages = {
    corporateEvent: "/images/corporate-event.png", // Your app's public folder
    pasniCeremony: "/images/pasni.jpg" // Your app's public folder
  };

  return (
    <HeroSection 
      onGetStarted={handleGetStarted}
      eventImages={eventImages}
    />
  );
};
```

### With External URLs

```tsx
import { HeroSection } from '@repo/ui';

const MyPage = () => {
  const handleGetStarted = () => {
    console.log('Get started clicked!');
  };

  const eventImages = {
    corporateEvent: "https://example.com/corporate-event.jpg",
    pasniCeremony: "https://example.com/pasni-ceremony.jpg"
  };

  return (
    <HeroSection 
      onGetStarted={handleGetStarted}
      eventImages={eventImages}
    />
  );
};
```

### With Custom Hero Data

```tsx
import { HeroSection } from '@repo/ui';

const MyPage = () => {
  const handleGetStarted = () => {
    console.log('Get started clicked!');
  };

  const heroData = {
    title: "Your Custom Title",
    subtitle: "Your Custom Subtitle",
    description: "Your custom description here.",
    backgroundImage: "https://example.com/hero-bg.jpg",
    ctaText: "Start Now",
    rotatingTexts: ["Custom", "Text", "Rotation"]
  };

  const eventImages = {
    corporateEvent: "/images/corporate-event.png",
    pasniCeremony: "/images/pasni.jpg"
  };

  return (
    <HeroSection 
      onGetStarted={handleGetStarted}
      heroData={heroData}
      eventImages={eventImages}
    />
  );
};
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onGetStarted` | `() => void` | ✅ | Callback function when "Get Started" button is clicked |
| `heroData` | `HeroData` | ❌ | Custom hero section data (title, subtitle, etc.) |
| `eventImages` | `EventImages` | ❌ | Custom image URLs for event showcase |

### HeroData Interface

```tsx
interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  ctaText: string;
  rotatingTexts: string[];
}
```

### EventImages Interface

```tsx
interface EventImages {
  corporateEvent?: string;
  pasniCeremony?: string;
}
```

## Image Handling

The component handles images in three ways:

1. **Custom Images**: Pass `eventImages` prop with your image URLs
2. **Default Images**: If no `eventImages` provided, uses images from UI package's public folder (`/images/`)
3. **Mixed**: You can provide only some images, others will use defaults

### UI Package Images

The component includes default images in `packages/ui/public/images/`:
- `corporate-event.png` - Corporate event photography
- `pasni.jpg` - Pasni ceremony photography

These images are automatically available when using the component without custom `eventImages`.

## Best Practices

1. **Use your app's public folder** for images when possible
2. **Provide fallback images** in case external URLs fail
3. **Optimize images** for web (WebP format recommended)
4. **Use appropriate image dimensions** (recommended: 1200x800px)

## Troubleshooting

### Images Not Loading

- Check if image URLs are correct
- Ensure images are accessible from your domain
- Verify CORS settings for external images
- Check browser console for 404 errors

### Component Not Rendering

- Ensure you're importing from the correct path
- Check if all required props are provided
- Verify TypeScript types match the interface
