// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { toRefs } from "vue";
import Theme from 'vitepress/theme'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import './style.css'
import PhotoGallery from "../../components/PhotoGallery.vue";
import ParallaxView from '../../components/ParallaxView.vue';

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
    enhanceApp({ app }) {
        app.component('PhotoGallery', PhotoGallery)
        app.component('ParallaxView', ParallaxView)
    },
  setup() {
    // Get frontmatter and route
    const { frontmatter } = toRefs(useData());
    const route = useRoute();

    // Obtain configuration from: https://giscus.app/
    giscusTalk({
          repo: "EdwinZhanCN/edwinzhancn.github.io",
          repoId: "R_kgDOLH2-Zg",
          category: "General", // default: `General`
          categoryId: "DIC_kwDOLH2-Zs4Chgdw",
          mapping: 'pathname', // default: `pathname`
          inputPosition: 'top', // default: `top`
          lang: 'en', // default: `zh-CN`
          // i18n setting (Note: This configuration will override the default language set by lang)
          // Configured as an object with key-value pairs inside:
          // [your i18n configuration name]: [corresponds to the language pack name in Giscus]
          locales: {
            'zh-Hans': 'zh-CN',
            'en-US': 'en'
          },
          homePageShowComment: false, // Whether to display the comment area on the homepage, the default is false
          lightTheme: 'light', // default: `light`
          darkTheme: 'transparent_dark', // default: `transparent_dark`
          // ...
        }, {
          frontmatter, route
        },
        // Whether to activate the comment area on all pages.
        // The default is true, which means enabled, this parameter can be ignored;
        // If it is false, it means it is not enabled.
        // You can use `comment: true` preface to enable it separately on the page.
        true
    );
  }
}
