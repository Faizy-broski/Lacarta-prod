'use client'

import { useEffect, useRef, useState } from 'react'
import { EditorContent, EditorContext, useEditor } from '@tiptap/react'
import type { Editor } from '@tiptap/core'

// — Tiptap Core Extensions —
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import { TextAlign } from '@tiptap/extension-text-align'
import { Typography } from '@tiptap/extension-typography'
import { Highlight } from '@tiptap/extension-highlight'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { Selection } from '@tiptap/extensions'

// — UI Primitives —
import { Button } from '@/components/tiptap-ui-primitive/button'
import { Button as ShadButton } from '@/components/ui/button'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/components/tiptap-ui-primitive/toolbar'

// — Tiptap Node —
import { ImageUploadNode } from '@/components/tiptap-node/image-upload-node/image-upload-node-extension'
import { HorizontalRule } from '@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension'
import '@/components/tiptap-node/blockquote-node/blockquote-node.scss'
import '@/components/tiptap-node/code-block-node/code-block-node.scss'
import '@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss'
import '@/components/tiptap-node/list-node/list-node.scss'
import '@/components/tiptap-node/image-node/image-node.scss'
import '@/components/tiptap-node/heading-node/heading-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'

// — Tiptap UI —
import { HeadingDropdownMenu } from '@/components/tiptap-ui/heading-dropdown-menu'
import { ListDropdownMenu } from '@/components/tiptap-ui/list-dropdown-menu'
import { BlockquoteButton } from '@/components/tiptap-ui/blockquote-button'
import { CodeBlockButton } from '@/components/tiptap-ui/code-block-button'
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from '@/components/tiptap-ui/color-highlight-popover'
import { LinkContent } from '@/components/tiptap-ui/link-popover'
import { MarkButton } from '@/components/tiptap-ui/mark-button'
import { TextAlignButton } from '@/components/tiptap-ui/text-align-button'
import { UndoRedoButton } from '@/components/tiptap-ui/undo-redo-button'

// — Shadcn UI —
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// — Icons —
import { ArrowLeftIcon } from '@/components/tiptap-icons/arrow-left-icon'
import { HighlighterIcon } from '@/components/tiptap-icons/highlighter-icon'
import { LinkIcon } from '@/components/tiptap-icons/link-icon'
import { ImageIcon } from 'lucide-react'
import { Link2Icon, Link2OffIcon } from 'lucide-react'

// — Hooks —
import { useIsBreakpoint } from '@/hooks/use-is-breakpoint'
import { useTiptapEditor } from '@/hooks/use-tiptap-editor'

// — Toast —
import { toast } from 'sonner'

// — Lib —
import { MAX_FILE_SIZE } from '@/lib/tiptap-utils'
import { supabase } from '@/lib/supabase'

// — Styles —
import '@/components/tiptap-templates/simple/simple-editor.scss'

// ─── Supabase image uploader ─────────────────────────────────────────────────

async function uploadImageToSupabase(
  file: File,
  onProgress?: (e: { progress: number }) => void
): Promise<string> {
  onProgress?.({ progress: 10 })
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `editor/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from('media')
    .upload(path, file, { upsert: false })

  if (error) throw new Error(`Storage upload failed: ${error.message}`)

  onProgress?.({ progress: 100 })

  const { data } = supabase.storage.from('media').getPublicUrl(path)
  return data.publicUrl
}

// ─── Link Dialog ──────────────────────────────────────────────────────────────

function LinkDialog({
  editor,
  open,
  onClose,
}: {
  editor: Editor | null
  open: boolean
  onClose: () => void
}) {
  const [url, setUrl] = useState('')
  const isActive = editor?.isActive('link')

  // Pre-fill with the current link href when editing
  useEffect(() => {
    if (open && editor) {
      const attrs = editor.getAttributes('link')
      setUrl(attrs?.href ?? '')
    }
  }, [open, editor])

  function handleApply() {
    if (!editor) return
    const trimmed = url.trim()
    if (!trimmed) return

    const hasSelection = !editor.state.selection.empty

    if (hasSelection) {
      // Wrap selected text in link
      editor.chain().focus().setLink({ href: trimmed, target: '_blank' }).run()
    } else {
      // Insert the URL as linked text at cursor
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'text',
          text: trimmed,
          marks: [{ type: 'link', attrs: { href: trimmed, target: '_blank' } }],
        })
        .run()
    }
    setUrl('')
    onClose()
  }

  function handleRemove() {
    if (!editor) return
    editor.chain().focus().unsetLink().run()
    setUrl('')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Insert link</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-3 py-2'>
          <Label htmlFor='link-url'>URL</Label>
          <Input
            id='link-url'
            placeholder='https://example.com'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            autoFocus
          />
        </div>

        <DialogFooter className='flex gap-2 sm:justify-between'>
          {isActive && (
            <ShadButton
              variant='ghost'
              onClick={handleRemove}
              className='text-destructive hover:text-destructive'
            >
              <Link2OffIcon className='mr-1 h-4 w-4' />
              Remove link
            </ShadButton>
          )}
          <div className='flex gap-2 ml-auto'>
            <ShadButton variant='outline' onClick={onClose}>
              Cancel
            </ShadButton>
            <ShadButton onClick={handleApply} disabled={!url.trim()}>
              <Link2Icon className='mr-1 h-4 w-4' />
              Apply
            </ShadButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Image Insert Dialog ──────────────────────────────────────────────────────

function ImageInsertDialog({
  editor,
  open,
  onClose,
}: {
  editor: Editor | null
  open: boolean
  onClose: () => void
}) {
  const [tab, setTab] = useState<'upload' | 'url'>('upload')
  const [url, setUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function insertImageSrc(src: string) {
    if (!editor || !src) return
    editor.chain().focus().setImage({ src }).run()
    onClose()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setProgress(0)
    try {
      const src = await uploadImageToSupabase(file, (ev) => setProgress(ev.progress))
      insertImageSrc(src)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Image upload failed')
    } finally {
      setUploading(false)
      setProgress(0)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  function handleUrlInsert() {
    insertImageSrc(url.trim())
    setUrl('')
  }

  function handleClose() {
    setUrl('')
    setUploading(false)
    setProgress(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Insert image</DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as 'upload' | 'url')}>
          <TabsList className='w-full'>
            <TabsTrigger value='upload' className='flex-1'>Upload file</TabsTrigger>
            <TabsTrigger value='url' className='flex-1'>Image URL</TabsTrigger>
          </TabsList>

          <TabsContent value='upload' className='py-3'>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleFileChange}
            />
            <ShadButton
              variant='outline'
              className='w-full'
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <ImageIcon className='mr-2 h-4 w-4' />
              {uploading ? `Uploading… ${progress}%` : 'Choose image'}
            </ShadButton>
          </TabsContent>

          <TabsContent value='url' className='py-3 flex flex-col gap-3'>
            <Label htmlFor='img-url'>Image URL</Label>
            <Input
              id='img-url'
              placeholder='https://example.com/image.jpg'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && url.trim() && handleUrlInsert()}
              autoFocus
            />
            <DialogFooter>
              <ShadButton variant='outline' onClick={handleClose}>Cancel</ShadButton>
              <ShadButton onClick={handleUrlInsert} disabled={!url.trim()}>Insert</ShadButton>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// ─── Toolbar link button (always clickable) ────────────────────────────────────

function LinkToolbarButton({ onClick }: { onClick: () => void }) {
  const { editor } = useTiptapEditor()
  const isActive = editor?.isActive('link')
  return (
    <Button
      variant='ghost'
      data-active-state={isActive ? 'on' : 'off'}
      aria-label='Insert link'
      aria-pressed={isActive}
      onClick={onClick}
      className='tiptap-button'
    >
      <LinkIcon className='tiptap-button-icon' />
    </Button>
  )
}

// ─── Toolbar image button ──────────────────────────────────────────────────────

function ImageToolbarButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant='ghost'
      aria-label='Insert image'
      onClick={onClick}
      className='tiptap-button'
    >
      <ImageIcon className='tiptap-button-icon' />
    </Button>
  )
}

// ─── Toolbar Contents ─────────────────────────────────────────────────────────

function MainToolbarContent({
  onHighlighterClick,
  onLinkClick,
  onImageClick,
  isMobile,
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  onImageClick: () => void
  isMobile: boolean
}) {
  return (
    <>
      <ToolbarGroup>
        <UndoRedoButton action='undo' />
        <UndoRedoButton action='redo' />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu modal={false} levels={[1, 2, 3, 4]} />
        <ListDropdownMenu
          modal={false}
          types={['bulletList', 'orderedList', 'taskList']}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type='bold' />
        <MarkButton type='italic' />
        <MarkButton type='strike' />
        <MarkButton type='code' />
        <MarkButton type='underline' />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        <LinkToolbarButton onClick={onLinkClick} />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type='superscript' />
        <MarkButton type='subscript' />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align='left' />
        <TextAlignButton align='center' />
        <TextAlignButton align='right' />
        <TextAlignButton align='justify' />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageToolbarButton onClick={onImageClick} />
      </ToolbarGroup>
    </>
  )
}

function MobileToolbarContent({
  type,
  onBack,
}: {
  type: 'highlighter' | 'link'
  onBack: () => void
}) {
  return (
    <>
      <ToolbarGroup>
        <Button variant='ghost' onClick={onBack}>
          <ArrowLeftIcon className='tiptap-button-icon' />
          {type === 'highlighter' ? (
            <HighlighterIcon className='tiptap-button-icon' />
          ) : (
            <LinkIcon className='tiptap-button-icon' />
          )}
        </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      {type === 'highlighter' ? (
        <ColorHighlightPopoverContent />
      ) : (
        <LinkContent />
      )}
    </>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export interface RichTextEditorProps {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
  minHeight?: number
}

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Start writing…',
  minHeight = 240,
}: RichTextEditorProps) {
  const isMobile = useIsBreakpoint()
  const [mobileView, setMobileView] = useState<'main' | 'highlighter' | 'link'>('main')
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const toolbarRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: 'simple-editor',
      },
    },
    extensions: [
      StarterKit.configure({ horizontalRule: false }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      HorizontalRule,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image.extend({ draggable: true }),
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 10,
        upload: uploadImageToSupabase,
        onError: (error: Error) => console.error('[RichTextEditor] Image upload failed:', error),
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
  })

  // Sync external value changes (e.g. loaded from DB after mount)
  useEffect(() => {
    if (!editor) return
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (!isMobile && mobileView !== 'main') {
      setMobileView('main')
    }
  }, [isMobile, mobileView])

  function openLinkDialog() {
    editor?.chain().focus().run()
    setLinkDialogOpen(true)
  }

  function openImageDialog() {
    editor?.chain().focus().run()
    setImageDialogOpen(true)
  }

  return (
    <div
      className='w-full min-w-0 rounded-md border focus-within:ring-1 focus-within:ring-ring flex flex-col overflow-hidden'
      style={{ minHeight } as React.CSSProperties}
    >
      <EditorContext.Provider value={{ editor }}>
        <Toolbar ref={toolbarRef}>
          {mobileView === 'main' ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView('highlighter')}
              onLinkClick={openLinkDialog}
              onImageClick={openImageDialog}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
              onBack={() => setMobileView('main')}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role='presentation'
          className='flex-1 w-full min-w-0 [&_.tiptap]:p-4 [&_.tiptap]:min-h-[inherit] [&_.tiptap]:outline-none [&_.tiptap_img]:cursor-move [&_.tiptap_img]:max-w-full'
        />

        <LinkDialog editor={editor} open={linkDialogOpen} onClose={() => setLinkDialogOpen(false)} />
        <ImageInsertDialog editor={editor} open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} />
      </EditorContext.Provider>
    </div>
  )
}
