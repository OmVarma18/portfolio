import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { contactConfig } from '@/config/Contact';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    ...getMetadata('/contact'),
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function ContactPage() {
    return (
        <Container className="py-16">
            <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                        {contactConfig.title}
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                        {contactConfig.description}
                    </p>
                </div>
                <Separator />

                {/* Contact CTA */}
                <div className="mx-auto flex flex-col items-center justify-center space-y-6 text-center mt-12 mb-24">
                    <div className="bg-primary/10 p-6 rounded-full">
                        <Mail className="h-12 w-12 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Drop me an email</h2>
                    <p className="text-muted-foreground max-w-md">
                        I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                    </p>
                    <Button asChild size="lg" className="mt-4 rounded-full px-8">
                        <a href={`mailto:omvarma369@gmail.com`}>
                            Say Hello
                        </a>
                    </Button>
                </div>
            </div>
        </Container>
    );
}