'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { sendToTelegram } from '@/lib/telegram';

import Chat from '../svgs/Chat';

const contactFormSchema = z.object({
    name: z.string().min(0, {
        message: 'Name must be at least 2 characters.',
    }),
    email: z.email({
        message: 'Please enter a valid email address.',
    }).optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')).refine((val) => !val || (val.length >= 10 && /^[\+]?[1-9][\d]{0,15}$/.test(val)), {
        message: 'Please enter a valid phone number (at least 10 digits).',
    }),
    message: z
        .string()
        .min(0, {
            message: 'Message must be at least 2 characters.',
        })
        .max(1000, {
            message: 'Message must not exceed 1000 characters.',
        }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);

        try {
            const message = `
🔔 *New Contact Form Submission*

👤 *Name:* ${data.name.trim() || 'Not provided'}
📧 *Email:* ${data.email?.trim() || 'Not provided'}
📱 *Phone:* ${data.phone?.trim() || 'Not provided'}

💬 *Message:*
${data.message.trim()}

⏰ *Submitted:* ${new Date().toISOString()}
            `.trim();

            await sendToTelegram(message);

            toast.success('Message sent successfully!');
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to send message. Please ensure Telegram is configured.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="border-none bg-transparent shadow-none">
            <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>
                    Fill out the form below and I will get back to you as soon as
                    possible. Only name in compalsory.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+1 (123) xxx-xxxx" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="your.email@example.com"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reason To Contact</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Have a job offer a project or just say hello..."
                                            className="min-h-[120px] resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-fit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending your message...
                                </>
                            ) : (
                                <>
                                    <Chat className="mr-2 h-4 w-4" />
                                    Send Message
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
