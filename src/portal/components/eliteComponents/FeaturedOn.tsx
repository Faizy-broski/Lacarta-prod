import { Badge } from "@public/components/ui/badge"
import facebookImg from '../../../public/assets/facebook.png'
import instaImg from '../../../public/assets/instagram.png'
import twiterImg from '../../../public/assets/twitter.png'

const tags = [
    {
        name:'Instagram',
        logo: <img src={instaImg} className="h-5 w-5" alt="instagram icons"></img>,
    },{
        name:'Facebook',
        logo: <img src={facebookImg} className="h-5 w-5" alt="facebook icons"></img> ,
    },{
        name:'Twitter',
        logo: <img src={twiterImg} className="h-5 w-5" alt="twitter logo icons"></img> ,
    },
]

export function FeaturedOn() {
  return (
    <section className="max-w-6xl mx-auto px-4 space-y-3">
    
       <h2 className="text-3xl text-black font-serif font-semibold">
          Featured On
        </h2>

     <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
  {tags.map((tag) => (
    <Badge
      variant="secondary"
      className="flex items-center justify-center py-2 bg-[#fbf7ec] border-1 border-[#f1e4c6] text-center"
    >
        {tag.logo}
      {tag.name}
    </Badge>
  ))}
</div>
    </section>
  )
}
