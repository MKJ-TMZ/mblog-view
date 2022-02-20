import router from "@/router";

export default {
  goBlogPage({}, blog: any) {
    router.push(`/blog/${blog.id}`).then()
  }
}