'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { ViewInRoomIcon } from '@/components/icons/ViewInRoomIcon';

export function ARView({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const placeholderImage = PlaceHolderImages.find(img => img.id === product.images[0]);
  const imageUrl = placeholderImage?.imageUrl || 'https://picsum.photos/seed/default/600/600';

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!isOpen) {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, toast]);

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
          <DialogTitle>View "{product.name}" in your room</DialogTitle>
        </DialogHeader>
        <div className="flex-grow relative overflow-hidden">
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
          
          {hasCameraPermission === false && (
            <div className="absolute inset-0 bg-background flex items-center justify-center">
              <Alert variant="destructive" className="max-w-md">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  Please allow camera access to use this feature. You may need to change permissions in your browser settings.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {hasCameraPermission === true && (
            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                <div className="relative w-1/2 h-1/2 pointer-events-auto cursor-move">
                    <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    data-ai-hint={placeholderImage?.imageHint}
                    />
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
