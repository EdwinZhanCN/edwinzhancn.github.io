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
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Bilibili</title><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36C.036 8.476.556 7.217 1.56 6.227c1.004-.995 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .356-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.789 1.894v7.52c.02.764.283 1.396.789 1.894.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.13.789-1.894v-7.52c-.02-.764-.283-1.396-.789-1.894-.507-.497-1.134-.755-1.88-.773zM8.24 9.353c.746 0 1.347.601 1.347 1.347v3.707c0 .746-.6 1.346-1.347 1.346-.746 0-1.346-.6-1.346-1.346V10.7c0-.746.6-1.347 1.346-1.347zm7.520 0c.746 0 1.347.601 1.347 1.347v3.707c0 .746-.601 1.346-1.347 1.346-.746 0-1.347-.6-1.347-1.346V10.7c0-.746.601-1.347 1.347-1.347z"/></svg>',
        },
        link: "https://space.bilibili.com/592046389",
        ariaLabel: "Bilibili",
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
