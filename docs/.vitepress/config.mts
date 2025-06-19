import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Welcome to my blog",
  description: "I will share my journey of computer science here.",
  base: "/",
  themeConfig: {
    search: {
      provider: "local",
    },
    logo: "/logo.svg",
    siteTitle: "Ed's Blog",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
      { text: "Changelog", link: "/changelog" },
      {
        text: "Guides",
        items: [
          {
            text: "Personal Website Tutorial",
            link: "/guides/personal-web-tutorial/personal-website-tutorial-about",
          },
          {
            text: "YOLOv8 on Jetson",
            link: "/guides/jetson-yolo/Introduction",
          },
          {
            text: "Cloudflare R2 Media Management",
            link: "/guides/cloudflare-r2/",
          },
        ],
      },
      { text: "Gallery", link: "/gallery/PhotoLib/portfolio_d100" },
      { text: "Tools", link: "/Tools/Docker" },
    ],

    sidebar: [
      {
        text: "About",
        link: "/about",
      },
      {
        text: "Guides",
        collapsed: false,
        items: [
          {
            text: "Personal Website Tutorial",
            collapsed: true,
            items: [
              {
                text: "Introduction",
                link: "/guides/personal-web-tutorial/personal-website-tutorial-about",
              },
              {
                text: "Start with Azure",
                link: "/guides/personal-web-tutorial/Start-with-Azure",
              },
              {
                text: "Connect to Virtual Machine",
                link: "/guides/personal-web-tutorial/Connect-to-Virtual-Machine",
              },
              {
                text: "Setup Nginx",
                link: "/guides/personal-web-tutorial/Nginx-Setup",
              },
              {
                text: "Setup Domain name",
                link: "/guides/personal-web-tutorial/Domain-name-setup",
              },
              {
                text: "Setup SSL-Certificate (Optional)",
                link: "/guides/personal-web-tutorial/SSL-Certificate-Setup",
              },
              {
                text: "First HTML page!",
                link: "/guides/personal-web-tutorial/First HTML page!",
              },
            ],
          },
          {
            text: "YOLOv8 on Jetson Orin Nano",
            collapsed: true,
            items: [
              {
                text: "Introduction",
                link: "/guides/jetson-yolo/Introduction",
              },
              {
                text: "Have a Look On Jetson Orin Nano",
                link: "/guides/jetson-yolo/Ubuntu desktop and Jetpack",
              },
              {
                text: "Download Applications",
                link: "/guides/jetson-yolo/Downloads Applications",
              },
              {
                text: "Setup Environment",
                link: "/guides/jetson-yolo/Setup The Environment Using Anaconda",
              },
              {
                text: "Code and Run",
                link: "/guides/jetson-yolo/Code and Run YOLOv8",
              },
              {
                text: "Segmentation With CSI Camera",
                link: "/guides/jetson-yolo/YOLOv8 Segmentation With CSI Camera",
              },
              { text: "Basics", link: "/guides/jetson-yolo/Basic commands" },
            ],
          },
          {
            text: "Gesture Recognition Using DeepStream SDK",
            collapsed: true,
            items: [
              {
                text: "Introduction",
                link: "/guides/jetson-deepstream-yolo/Introduction",
              },
            ],
          },
          {
            text: "Cloudflare R2 Media Management",
            collapsed: true,
            items: [
              {
                text: "Getting Started with R2",
                link: "/guides/cloudflare-r2/",
              },
            ],
          },
        ],
      },
      {
        text: "SWE",
        collapsed: false,
        items: [
          {
            text: "@Culinex-Recipe Mastring SwiftData",
            link: "/SWE/@Culinex-Recipe Mastering SwiftData",
          },
          {
            text: "@Lumilio-Photos WAL (Wait-Ahead Logging)",
            link: "/SWE/@Lumilio-Photos WAL (Wait-Ahead Log)",
          },
        ],
      },
      {
        text: "Tools",
        collapsed: true,
        items: [{ text: "Docker", link: "/Tools/Docker" }],
      },
      {
        text: "Gallery",
        collapsed: true,
        items: [
          { text: "Nikon D100", link: "/gallery/portfolio_d100" },
          { text: "Nikon Zfc", link: "/gallery/portfolio_zfc" },
        ],
      },
      {
        text: "Playlists",
        collapsed: true,
        items: [
          { text: "Current Music", link: "/playlists/current-playlists" },
        ],
      },
      {
        text: "Activities",
        collapsed: true,
        items: [
          {
            text: "Minecraft Server",
            link: "/Activities/minecraft-server/MC-guide",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/EdwinZhanCN" },
      {
        icon: "bilibili",
        link: "https://space.bilibili.com/592046389",
      },
    ],

    footer: {
      message: "Built with VitePress",
      copyright: "Copyright © 2024 Edwin Zhan",
    },

    editLink: {
      pattern:
        "https://github.com/EdwinZhanCN/edwinzhancn.github.io/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    lastUpdated: {
      text: "Last updated",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
      },
    },
  },
  markdown: {
    math: true,
  },
});
