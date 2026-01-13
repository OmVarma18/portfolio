import { Badge } from '../ui/badge'
import { BlogPostPreview } from '@/types/blog'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Link from 'next/link'
import Image from 'next/image'

import ArrowRight from '../svgs/ArrowRight';
import Calender from '../svgs/Calender';

interface BlogCardProps {
    post: BlogPostPreview
}
export function BlogCard({ post }: BlogCardProps) {
    const { slug, frontmatter } = post;
    const { title, description, image, tags, date } = frontmatter;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return (
        <Card className='group h-full w-full overflow-hidden border-gray-100 p-0 shadow-none transition-all dark:border-gray-800'>
            <CardHeader className='p-0'>
                <div className="relative aspect-video overflow-hidden">
                    <Link href={`/blog/${slug}`}>
                        <Image src={image} alt={title} fill className="transition-transform duration-500 group-hover:scale-105 object-cover" />
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <Link href={`/blog/${slug}`}>
                        <h3 className="group-hover:text-primary line-clamp-2 text-xl leading-tight font-semibold">
                            {/* {titlewhy} */}
                        </h3>
                    </Link>
                    <p className="text-secondary mt-4 line-clamp-3">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}