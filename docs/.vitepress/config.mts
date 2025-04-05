import { defineConfig } from 'vitepress'
import imagemin from 'vite-plugin-imagemin'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Welcome to my blog",
  description: "I will share my journey of computer science here.",
  base: '/',
  themeConfig: {
    search: {
      provider: 'local'
    },
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
        collapsed: true,
        items: [
          { text: 'Introduction', link: '/PersonalWebTut/personal-website-tutorial-about' },
          { text: 'Start with Azure', link: '/PersonalWebTut/Start-with-Azure' },
          { text: 'Connect to Virtual Machine', link: '/PersonalWebTut/Connect-to-Virtual-Machine' },
          { text: 'Setup Nginx', link: '/PersonalWebTut/Nginx-Setup' },
          { text: 'Setup Domain name', link: '/PersonalWebTut/Domain-name-setup' },
          { text: 'Setup SSL-Certificate (Optional)', link: '/PersonalWebTut/SSL-Certificate-Setup'},
          { text: 'First HTML page!', link: '/PersonalWebTut/First HTML page!'}
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
            { text: 'Segmentation With CSI Camera', link: '/JetsonYolo/YOLOv8 Segmentation With CSI Camera' },
            { text: 'Basics', link: '/JetsonYolo/Basic commands' },
        ],
      },
      {
        text: 'Tools',
        collapsed: true,
        items:[
          {text: 'Docker', link: '/Tools/Docker'}
        ]
      },
      {
        text: 'Sharing My Playlist',
        collapsed: true,
        items:[
          {text: 'Current Playlists', link: '/current-playlists'},
        ],
      },
      {
        text: 'Photo Gallery',
        collapsed: true,
        items:[
          {text: 'Nikon D100', link: '/PhotoLib/portfolio_d100'},
          {text: 'Nikon Zfc', link: '/PhotoLib/portfolio_zfc'},
        ]
      },
      {
        text:'Activities',
        collapsed: true,
        items:[
          {text: 'minecraft-server', link: '/Activities/minecraft-server/MC-guide'},
        ]
      },
    ],


    socialLinks: [
      { icon: 'github', link: 'https://github.com/EdwinZhanCN' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/592046389'},
    ]
  },
  plugins: [
    imagemin({
      optipng: { optimizationLevel: 5 } // PNG 压缩级别
    })
  ],
  markdown: {
    math: true
  }
})

function vue() {
    throw new Error('Function not implemented.')
}

