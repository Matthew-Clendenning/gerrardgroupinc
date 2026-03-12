export default function jsonLDGenerator({ type = "website", data = {}, url = "" }) {
  const baseUrl = "https://gerrardgroupinc.com";

  // Organization schema - included on every page
  const organization = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Gerrard Group Inc",
    "alternateName": "Gerrard Machinery Company",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/images/dans%20logo%20copy6.png`,
      "width": 1200,
      "height": 630
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-847-894-3434",
        "contactType": "sales",
        "email": "gerrardmachinery@gmail.com",
        "areaServed": ["US", "MX", "CA"],
        "availableLanguage": ["English", "Spanish"]
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/gerrard-group-inc/"
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "Chicago",
        "addressRegion": "IL",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "addressLocality": "St. Louis",
        "addressRegion": "MO",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "addressLocality": "Spokane",
        "addressRegion": "WA",
        "addressCountry": "US"
      }
    ]
  };

  // LocalBusiness schema for homepage
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    "name": "Gerrard Group Inc",
    "alternateName": "Gerrard Machinery Company",
    "description": "Industrial machinery auctions, liquidations, appraisals, and consulting services. Buyers and sellers of used industrial equipment across the United States.",
    "url": baseUrl,
    "telephone": "+1-847-894-3434",
    "email": "gerrardmachinery@gmail.com",
    "image": `${baseUrl}/images/dans%20logo%20copy6.png`,
    "priceRange": "$$$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Wire Transfer",
    "areaServed": [
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "Mexico" },
      { "@type": "Country", "name": "Canada" }
    ],
    "knowsAbout": [
      "Industrial Machinery Auctions",
      "Equipment Liquidation",
      "Machinery Appraisals",
      "Hydraulic Press Equipment",
      "Air Compressors",
      "CNC Machinery",
      "Fabrication Equipment",
      "Used Industrial Equipment Sales"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Industrial Machinery & Equipment",
      "itemListElement": [
        { "@type": "OfferCatalog", "name": "Hydraulic Presses" },
        { "@type": "OfferCatalog", "name": "Portable Air Compressors" },
        { "@type": "OfferCatalog", "name": "CNC & Robotics Equipment" },
        { "@type": "OfferCatalog", "name": "Fabrication Equipment" }
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/company/gerrard-group-inc/"
    ]
  };

  // Product schema for individual machine pages
  if (type === "product" && data) {
    const product = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "name": data.name || "",
          "description": data.description || "",
          "brand": {
            "@type": "Brand",
            "name": data.brand || "Various"
          },
          "category": data.category || "Industrial Machinery",
          "url": url || "",
          ...(data.image ? { "image": data.image } : {}),
          ...(data.sku ? { "sku": data.sku } : {}),
          ...(data.condition ? { "itemCondition": `https://schema.org/${data.condition}` } : { "itemCondition": "https://schema.org/UsedCondition" }),
          "offers": {
            "@type": "Offer",
            "url": url || "",
            "priceCurrency": "USD",
            "price": data.price || "",
            "availability": data.sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Gerrard Group Inc"
            }
          }
        },
        organization
      ]
    };
    return `<script type="application/ld+json">${JSON.stringify(product)}</script>`;
  }

  // Service schema for services page
  if (type === "services") {
    const services = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "serviceType": "Industrial Machinery Auctions & Liquidations",
          "provider": { "@id": `${baseUrl}/#organization` },
          "areaServed": [
            { "@type": "Country", "name": "United States" },
            { "@type": "Country", "name": "Mexico" },
            { "@type": "Country", "name": "Canada" }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Gerrard Group Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Industrial Machinery Auctions", "description": "Professional auction services for industrial machinery and equipment with strategic marketing to achieve highest returns." }
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Equipment Liquidation", "description": "Complete liquidation services for plant closings, surplus equipment, and asset recovery." }
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Machinery Appraisals", "description": "USPAP-compliant forced liquidation, orderly liquidation, and fair market value appraisals." }
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Consulting Services", "description": "Asset consulting to determine the highest and best use of company machinery and equipment." }
              }
            ]
          }
        },
        organization
      ]
    };
    return `<script type="application/ld+json">${JSON.stringify(services)}</script>`;
  }

  // Default: WebSite + Organization + LocalBusiness (for homepage)
  const defaultSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "name": "Gerrard Group Inc",
        "alternateName": "Gerrard Machinery Company",
        "url": baseUrl
      },
      organization,
      ...(type === "homepage" ? [localBusiness] : [])
    ]
  };

  return `<script type="application/ld+json">${JSON.stringify(defaultSchema)}</script>`;
}
