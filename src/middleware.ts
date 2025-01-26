import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/blog(.*)", "/auth(.*)", "/portal(.*)", "/images(.*)"],
    ignoredRoutes: ["/chatbot"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
