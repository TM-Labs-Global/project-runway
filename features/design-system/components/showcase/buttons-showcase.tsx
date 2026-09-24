import { Plane, ChevronRight, Search, Bell } from "lucide-react";
import { Text, Button } from "@/shared/components/ui";

export function ButtonsShowcase() {
    return (
        <section className="space-y-8">
            <div>
                <Text variant="h2" weight="bold" className="mb-2 block">Buttons</Text>
                <Text variant="base" intent="secondary">
                    Interactive button components with multiple variants and states.
                </Text>
            </div>

            {/* Primary & Brand Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <Text variant="lg" weight="semibold" className="mb-4 block">
                    Brand & Interaction Variants
                </Text>
                <div className="flex flex-wrap items-center gap-4">
                    <Button variant="primary">Explore Runway</Button>
                    <Button variant="secondary">View Collection</Button>
                    <Button variant="tertiary">Read Editorial</Button>
                </div>
                <Text variant="xs" intent="muted" className="mt-4 block">
                    Magenta 500 for primary CTA, Plum 900 for secondary brand actions, Plum 100 for tertiary controls
                </Text>
            </div>

            {/* Button Sizes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <Text variant="lg" weight="semibold" className="mb-4 block">
                    Button Sizes
                </Text>
                <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small (40px)</Button>
                    <Button size="md">Medium (48px)</Button>
                    <Button size="lg">Large (56px)</Button>
                    <Button size="xl">Extra Large (72px)</Button>
                </div>
            </div>

            {/* Outline & Ghost */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <Text variant="lg" weight="semibold" className="mb-4 block">
                    Outline & Ghost Variants
                </Text>
                <div className="flex flex-wrap items-center gap-4">
                    <Button variant="outline-plum">Outline Plum</Button>
                    <Button variant="outline-magenta">Outline Magenta</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="link" href="#">Link Variant</Button>
                </div>
            </div>

            {/* Button States */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <Text variant="lg" weight="semibold" className="mb-4 block">
                    Button States
                </Text>
                <div className="flex flex-wrap items-center gap-4">
                    <Button>Default</Button>
                    <Button className="bg-[var(--color-action-primary-hover)]">Hover State</Button>
                    <Button className="ring-2 ring-[var(--color-action-primary)] ring-offset-2">Focus State</Button>
                    <Button disabled>Disabled</Button>
                    <Button isLoading>Loading</Button>
                </div>
            </div>

            {/* Icon Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <Text variant="lg" weight="semibold" className="mb-4 block">
                    Icon Buttons & Layouts
                </Text>
                <div className="flex flex-wrap items-center gap-6">
                    <Button leftIcon={<Plane className="w-5 h-5" />}>
                        Book Flight
                    </Button>
                    <Button variant="secondary" rightIcon={<ChevronRight className="w-5 h-5" />}>
                        Continue
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button variant="secondary" size="md" icon={<Search className="w-5 h-5" />} rounded />
                        <Button variant="ghost" size="sm" icon={<Bell className="w-5 h-5" />} className="border border-[var(--color-border-default)]" />
                    </div>
                </div>
            </div>
        </section>
    );
}
