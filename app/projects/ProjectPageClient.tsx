'use client';

import Container from '@/components/common/Container';
import { ProjectList } from '@/components/Project/ProjectList';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { Project } from '@/types/Project';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectPageClientProps {
    projects: Project[];
}

type FilterType = 'working' | 'building';

export function ProjectPageClient({ projects: initialProjects }: ProjectPageClientProps) {
    const { triggerHaptic, isMobile } = useHapticFeedback();
    const [selectedFilter, setSelectedFilter] = useState<FilterType | null>(null);

    const workingCount = initialProjects.filter((p) => p.isWorking).length;
    const buildingCount = initialProjects.filter((p) => !p.isWorking).length;

    const filteredProjects = selectedFilter
        ? initialProjects.filter((p) =>
            selectedFilter === 'working' ? p.isWorking : !p.isWorking
        )
        : initialProjects;

    const handleFilterClick = (filter: FilterType) => {
        if (isMobile()) {
            triggerHaptic('light');
        }

        if (selectedFilter === filter) {
            setSelectedFilter(null);
        } else {
            setSelectedFilter(filter);
        }
    };

    return (
        <Container className="py-16">
            <div className="space-y-8">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                        Projects
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                        My Projects across diffrent domains and technologies I have worked
                    </p>
                </div>

                <Separator />

                <div className="space-y-6">
                    {/* Filters */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Filter by Status</h2>
                            {selectedFilter && (
                                <button
                                    onClick={() => setSelectedFilter(null)}
                                    className="text-muted-foreground hover:text-foreground text-sm underline"
                                >
                                    Clear filter
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleFilterClick('working')}
                                className="transition-colors"
                            >
                                <Badge
                                    variant={selectedFilter === 'working' ? 'default' : 'outline'}
                                    className="hover:bg-accent hover:text-accent-foreground tag-inner-shadow cursor-pointer capitalize"
                                >
                                    Working ({workingCount})
                                </Badge>
                            </button>
                            <button
                                onClick={() => handleFilterClick('building')}
                                className="transition-colors"
                            >
                                <Badge
                                    variant={selectedFilter === 'building' ? 'default' : 'outline'}
                                    className="hover:bg-accent hover:text-accent-foreground tag-inner-shadow cursor-pointer capitalize"
                                >
                                    Building ({buildingCount})
                                </Badge>
                            </button>
                        </div>
                    </div>

                    {/* Project List */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">
                                {selectedFilter
                                    ? selectedFilter === 'working'
                                        ? 'Working Projects'
                                        : 'Building Projects'
                                    : 'All Projects'}
                                {filteredProjects.length > 0 && (
                                    <span className="text-muted-foreground ml-2 text-sm font-normal">
                                        ({filteredProjects.length}{' '}
                                        {filteredProjects.length === 1 ? 'project' : 'projects'})
                                    </span>
                                )}
                            </h2>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedFilter || 'all'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ProjectList projects={filteredProjects} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Container>
    );
}
