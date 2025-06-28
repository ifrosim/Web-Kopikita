import edge from 'edge.js'
import { HttpContext } from '@adonisjs/core/http'

edge.global('old', (key: string, ctx: HttpContext) => {
  return ctx.session.get(`flashMessages.old.${key}`) ?? ''
})

edge.global('errors', (key?: string, ctx?: HttpContext) => {
  const errors = ctx?.session.get('flashMessages.errors') || {}
  return key ? errors[key] : errors
})
