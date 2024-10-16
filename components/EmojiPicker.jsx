import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Smile } from 'lucide-react';

// This is a simplified emoji picker. For a full-featured picker, you might want to use a library like emoji-mart
const emojis = ['😀', '😂', '😊', '😍', '🤔', '👍', '👎', '🎉', '🚀', '💡'];

export function EmojiPicker({ onEmojiSelect }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Smile className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-5 gap-2">
          {emojis.map((emoji) => (
            <Button
              key={emoji}
              variant="ghost"
              className="text-2xl"
              onClick={() => onEmojiSelect(emoji)}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
