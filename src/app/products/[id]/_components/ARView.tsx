'use client';

// It is not a mistake that we are not using many of the imports below.
// They are needed to declare the <model-viewer> custom element type.
import {
  useState,
  useRef,
  useEffect,
  createElement,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import type { Product } from '@/lib/types';
import { ViewInRoomIcon } from '@/components/icons/ViewInRoomIcon';

// TypeScript definitions for the <model-viewer> custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          src: string;
          alt: string;
          'ar'?: boolean;
          'ar-modes'?: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
          'shadow-intensity'?: string;
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }
}

export function ARView({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!product.modelSrc) {
    return null; // Don't render the button if there's no model
  }

  const modelSrc = product.modelSrc || "https://modelviewer.dev/shared-assets/models/Astronaut.glb";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          <ViewInRoomIcon className="mr-2 h-5 w-5" />
          View in Room
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>View "{product.name}" in 3D</DialogTitle>
          <DialogDescription>
            On a mobile device, tap the AR button to place this in your room.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow relative overflow-hidden">
          {/* We only render the model-viewer on the client after the dialog is open */}
          {isOpen && (
            <model-viewer
              src={modelSrc}
              alt={`3D model of ${product.name}`}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              shadow-intensity="1"
              style={{ width: '100%', height: '100%', backgroundColor: '#f7f7f7' }}
            ></model-viewer>
          )}
        </div>
        <div className="p-4 border-t flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
