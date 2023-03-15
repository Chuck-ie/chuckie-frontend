import { createWebHistory, createRouter } from "vue-router";
import routes from "~pages"

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.afterEach(() => {
    const route : string = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);

    if (route.length > 0) {
        document.title = route.charAt(0).toUpperCase() + route.slice(1);
    } else {
        document.title = "Home"
    }
})

export default router;