"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog"

import { useSetting } from "@/hooks/use-settings"
import { Label } from "@/components/ui/label"
import { ModeToggle } from "@/components/mode-toggle"

export const SettingModal = () => {
  const setting = useSetting()

  return (
    <Dialog open={setting.isOpen} onOpenChange={setting.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">
            My settings
          </h2>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span>
              Customize how Yotion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  )
}