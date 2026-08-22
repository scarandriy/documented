"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Minus, Plus } from "lucide";
import { MorphIcon } from "morphicons/react";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui Accordion, раздетый до механики.
 * Дефолтные бордеры, размеры и chevron-иконки сняты: плюс/минус слева
 * через morphicons, текст — тоже слева. Внешний вид пунктов задаёт
 * секция FAQ.
 */

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-t border-hairline last:border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        {...props}
        data-slot="accordion-trigger"
        className={cn(
          "group/trigger flex flex-1 cursor-pointer items-start gap-3 py-5 text-left outline-none md:gap-5 md:py-6",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky",
          className
        )}
        render={(triggerProps, state) => (
          <button {...triggerProps}>
            <MorphIcon
              icon={state.open ? Minus : Plus}
              size={24}
              strokeWidth={2.5}
              className="mt-0.5 shrink-0 text-ink-40 transition-colors duration-300 group-hover/trigger:text-ink"
              spring="snappy"
              reducedMotion="user"
            />
            {children}
          </button>
        )}
      />
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
