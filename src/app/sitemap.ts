import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://createfolio.app";

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // You can also add dynamic routes by fetching data from an API or database
  // For example, if you have a list of portfolios:

  // const portfolios = await fetchPortfolios()
  // const portfolioRoutes = portfolios.map((portfolio) => ({
  //   url: `${baseUrl}/portfolio/${portfolio.slug}`,
  //   lastModified: new Date(portfolio.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // }))

  // return [...staticRoutes, ...portfolioRoutes]

  return staticRoutes;
}
