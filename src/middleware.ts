import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/blog(.*)", "/auth(.*)", "/portal(.*)", "/images(.*)", "/dashboard(.*)", "/settings"],
    ignoredRoutes: ["/chatbot"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
