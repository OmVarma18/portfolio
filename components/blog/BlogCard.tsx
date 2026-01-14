import { Badge } from '../ui/badge'
import { BlogPostPreview } from '@/types/blog'
import { Card } from '../ui/card'
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
        <Card className='group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-white/10 dark:bg-[#111]'>
            {/* Image Section */}
            <div className="relative aspect-video w-full overflow-hidden">
                <Link href={`/blog/${slug}`}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-5">
                {/* Title */}
                <Link href={`/blog/${slug}`}>
                    <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {title}
                    </h3>
                </Link>

                {/* Description */}
                <p className="mb-4 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>

                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {tags && tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* Footer: Date & Read More */}
                <div className="mt-auto flex items-center justify-between pt-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <Calender className="size-4" />
                        <span>{formattedDate}</span>
                    </div>

                    <Link
                        href={`/blog/${slug}`}
                        className="flex items-center gap-1 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                        Read More
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </Card>
    );
}