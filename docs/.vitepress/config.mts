import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
// @ts-ignore
export default defineConfig({
  title: "Welcome to my blog",
  description: "I will share my journey of computer science here.",
  base: '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/about' }
    ],

    sidebar: [
      {
        text: 'About this website',
        link: '/about',
      },
      {
        text: 'Personal Website Tutorial',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/personal-website-tutorial-about' },
          { text: 'Start with Azure', link: '/Start-with-Azure' },
          { text: 'Connect to Virtual Machine', link: '/Connect-to-Virtual-Machine' },
          { text: 'Setup Nginx', link: '/Nginx-Setup' },
          { text: 'Setup Domain name', link: '/Domain-name-setup' },
          { text: 'Setup SSL-Certificate (Optional)', link: '/SSL-Certificate-Setup'},
          { text: 'First HTML page!', link: '/First HTML page!'}
        ],
      },
      {
        text: 'YOLOv8 Tutorial On Jetson Orin Nano',
        collapsed: true,
        items: [
            { text: 'Introduction', link: '/JetsonYolo/Introduction' },
            { text: 'Have a Look On Jetson Orin Nano', link: '/JetsonYolo/Ubuntu desktop and Jetpack' },
            { text: 'Download Applications', link: '/JetsonYolo/Downloads Applications' },
            { text: 'Setup Environment', link: '/JetsonYolo/Setup The Environment Using Anaconda' },
            { text: 'Code and Run', link: '/JetsonYolo/Code and Run YOLOv8' },
            { text: 'Basics', link: '/JetsonYolo/Basic commands' },
        ],
      },
      {
        text: 'Sharing My Playlist',
        collapsed: true,
        items:[
          {text: 'Annual Songs', link: '/annual-songs'},
          {text: 'Current Playlists', link: '/current-playlists'},
        ],
      },
    ],


    socialLinks: [
      { icon: 'github', link: 'https://github.com/EdwinZhanCN' }
    ]
  }
})
