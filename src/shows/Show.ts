import { Url } from "url"

export type Show = { name: string, episodes: Episode } & Hateoas
export type Episode = { name: string, season: number, number: number } & Hateoas
// export type Image = {medium: URL, original: URL}
export type Hateoas = { _links: { self: { href: Url } } }