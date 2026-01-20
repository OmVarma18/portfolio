'use client';

import { ctaConfig } from '@/config/CTA';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import Cal, { getCalApi } from '@calcom/embed-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getValidationImagePath } from "@/lib/utils";


import Container from '../common/Container';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface CallToActionProps {
    profileImage?: string;
    profileAlt?: string;
    linkText?: string;
    calLink?: string;
    calOrigin?: string;
    preText?: string;
}

export default function CTA({
    profileImage = getValidationImagePath("ctaConfig.profileImage"),
    profileAlt = ctaConfig.profileAlt,
    linkText = ctaConfig.linkText,
    calLink = ctaConfig.calLink,
    calOrigin = ctaConfig.calOrigin,
    preText = ctaConfig.preText,
}: CallToActionProps) {
    const { triggerHaptic, isMobile } = useHapticFeedback();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<'qualify' | 'calendar'>('qualify');
    const [formData, setFormData] = useState({
        role: '',
        otherRole: '',
        inquiry: ''
    });

    useEffect(() => {
        (async function () {
            try {
                const calApi = await getCalApi({ namespace: "30min" });
                if (calApi) {
                    // @ts-ignore - origin is supported by the script but might be missing in types
                    calApi("ui", { origin: calOrigin });


                    calApi("ui", {
                        hideEventTypeDetails: false,
                        layout: "month_view"
                    });
                    calApi('on', {
                        action: 'bookingSuccessful',
                        callback: () => {
                            setIsOpen(false);
                        },
                    });
                }
            } catch (error) {
                console.error('Failed to initialize Cal API:', error);
            }
        })();
    }, [calLink, calOrigin]);

    const handleButtonClick = () => {
        if (isMobile()) {
            triggerHaptic('medium');
        }
        setStep('qualify');
        setIsOpen(true);
    };

    const isFormValid = formData.role === 'Other'
        ? formData.otherRole.trim() !== ''
        : (formData.role && formData.inquiry);

    const handleContinue = () => {
        if (isFormValid) {
            setStep('calendar');
        }
    };

    return (
        <Container className="mt-20 rounded-md border border-dashed border-black/20 py-8 dark:border-white/10">
            <div className="mt-6 w-full flex-col px-6 pb-8 sm:flex sm:items-center sm:justify-between sm:px-12">
                <p className="mb-4 text-center text-base opacity-50 sm:mb-3 md:text-xl">
                    {preText}
                </p>
                <div className="mt-4 flex w-full justify-center sm:mt-0 sm:w-auto sm:justify-end">
                    <div
                        className="group inline-flex cursor-pointer items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-1 text-sm text-black shadow-[0_0_5px_rgba(0,0,0,0.1)] transition-all dark:border-white/30 dark:bg-white/15 dark:text-white dark:shadow-[0_0_5px_rgba(255,255,255,0.1)]"
                        onClick={handleButtonClick}
                    >
                        <div className="relative z-20 flex items-center gap-2 transition-all duration-300 group-hover:gap-8">
                            <div className="h-5 w-5 flex-shrink-0 overflow-hidden rounded-full">
                                <Image
                                    alt={profileAlt}
                                    width={20}
                                    height={20}
                                    className="h-full w-full object-cover"
                                    src={profileImage}
                                    style={{ color: 'transparent' }}
                                />
                            </div>
                            <div className="absolute left-[24px] flex -translate-x-full transform items-center gap-0 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3 w-3"
                                >
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5v14"></path>
                                </svg>
                                <div className="mr-2 ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/10 text-[8px] dark:bg-white/10">
                                    You
                                </div>
                            </div>
                            <span className="relative ml-0 block text-sm font-bold whitespace-nowrap transition-all duration-300 group-hover:ml-4">
                                {linkText}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent
                    showCloseButton={false}
                    className={`max-h-[90vh] overflow-hidden transition-all duration-500 ${step === 'qualify'
                        ? "max-w-xl"
                        : "max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] md:max-w-4xl"
                        }`}
                >
                    <DialogHeader>
                        <DialogTitle>{step === 'qualify' ? 'Tell me about yourself' : 'Book a Meeting'}</DialogTitle>
                        <DialogDescription>
                            {step === 'qualify'
                                ? 'Please select your inquiry type to continue.'
                                : 'Schedule a time to connect and discuss opportunities'}
                        </DialogDescription>
                    </DialogHeader>

                    {step === 'qualify' ? (
                        <div className="space-y-6 py-4">
                            <div className="space-y-2">
                                <Label>Are you a?</Label>
                                <Select onValueChange={(v) => setFormData({ role: v, inquiry: '', otherRole: '' })}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select an option..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Founder">Founder / Startup</SelectItem>
                                        <SelectItem value="Recruiter">Recruiter</SelectItem>
                                        <SelectItem value="Designer">Designer</SelectItem>
                                        <SelectItem value="Developer">Developer</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {formData.role === 'Other' ? (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <Label>Please specify your inquiry</Label>
                                    <Input
                                        placeholder="Tell me what you'd like to discuss..."
                                        value={formData.otherRole}
                                        onChange={(e) => setFormData(prev => ({ ...prev, otherRole: e.target.value }))}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label>What&apos;s your inquiry about?</Label>
                                    <Select
                                        value={formData.inquiry}
                                        onValueChange={(v) => setFormData(prev => ({ ...prev, inquiry: v }))}
                                        disabled={!formData.role}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select an option..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Hiring">Want to hire you for job / job offer</SelectItem>
                                            <SelectItem value="Freelance">Freelance Project</SelectItem>
                                            <SelectItem value="Collaboration">Collaboration</SelectItem>
                                            <SelectItem value="Inquiry">General Inquiry</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <button
                                onClick={handleContinue}
                                disabled={!isFormValid}
                                className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Continue
                            </button>
                        </div>
                    ) : (
                        <div className="max-h-[calc(90vh-150px)] overflow-y-auto rounded-lg">
                            <Cal
                                namespace="30min"
                                calLink={calLink}
                                calOrigin={calOrigin}
                                config={{
                                    layout: "month_view",
                                    overlayCalendar: "true",
                                    name: 'Guest',
                                    notes: `Role: ${formData.role === 'Other' ? formData.otherRole : formData.role}, Inquiry: ${formData.inquiry}`,
                                }}
                                className="h-[500px] w-full rounded-lg"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
}
