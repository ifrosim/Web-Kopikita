import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  // Menampilkan form membuat post
  async create({ view }: HttpContext) {
    return view.render('pages/posts/create')
  }

  // Menyimpan post baru
  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!

    await user.related('posts').create({
      content: request.input('content'),
    })

    return response.redirect('/')
  }

  // Menampilkan form edit
  async edit({ params, response, view }: HttpContext) {
    const post = await Post.find(params.id)

    if (!post) {
      return response.notFound('Post tidak ditemukan')
    }

    return view.render('pages/posts/edit', { post })
  }

  // Menyimpan hasil edit post
  async update({ params, request, response }: HttpContext) {
    const post = await Post.find(params.id)

    if (!post) {
      return response.notFound('Post tidak ditemukan')
    }

    post.content = request.input('content')
    await post.save()

    return response.redirect('/')
  }

  // Menghapus post
  async destroy({ params, response }: HttpContext) {
    const post = await Post.find(params.id)

    if (!post) {
      return response.notFound('Post tidak ditemukan')
    }

    await post.delete()

    return response.redirect('/')
  }
}
