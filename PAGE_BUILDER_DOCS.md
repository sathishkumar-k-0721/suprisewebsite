# Page-Wise Content Builder

## Overview
The create page now uses a page-wise builder system where users select templates and build their surprise website page by page.

## Current Implementation

### Page Templates (Demo Version)
1. **Page 1: Text + Image** (₹70)
   - Personal message text (up to 500 characters)
   - Image upload (JPG, PNG, GIF - Max 10MB)

2. **Page 2: Text + Video** (₹100)
   - Personal message text (up to 500 characters)
   - Video upload (MP4, MOV, AVI - Max 100MB)

## User Flow

### Step 1: Page Selection
- User sees available page templates
- Can select multiple templates (currently 2 demo templates)
- Shows price for each template
- Displays running total cost
- Click "Continue to Build" to proceed

### Step 2: Page Building
- User builds pages one at a time
- Progress indicator shows "Page X of Y"
- Each page shows:
  - Template name and icon
  - Content form (text + image/video)
  - File upload validation with preview
  - Character counter for text
- Navigation:
  - "Previous" button (disabled on first page)
  - "Next" button (or "Complete" on last page)
- Cost breakdown sidebar shows:
  - Individual page costs
  - Current page highlighted
  - Total cost

### Step 3: Completion
- All page data collected
- Ready for Cloudinary upload (pending implementation)
- Saved to database with page-wise structure

## Data Structure

```typescript
interface PageTemplate {
  id: number
  name: string
  description: string
  price: number
  contentTypes: ('text' | 'image' | 'video')[]
  icon: IconType
  color: string
}

interface PageContent {
  templateId: number
  text: string
  image: File | null
  video: File | null
}
```

## Key Features

✅ Page-wise content creation
✅ Template selection system
✅ Progressive navigation (Next/Previous)
✅ Real-time cost calculation
✅ Per-page validation
✅ File upload with previews
✅ Character counting
✅ Responsive design
✅ Smooth animations

## Future Enhancements

### Planned Features
1. **More Templates**
   - Page 3: Image Gallery (multiple images + text)
   - Page 4: Audio Message (audio + text)
   - Page 5: Mixed Media (text + image + audio)
   - Custom templates

2. **Template Categories**
   - Birthday themes
   - Anniversary themes
   - Celebration themes
   - Romantic themes

3. **Advanced Features**
   - Template preview before selection
   - Drag-and-drop file uploads
   - Image cropping/editing
   - Video preview/trimming
   - Draft saving (save progress)
   - Template customization (colors, fonts)

4. **User Management**
   - Save as draft
   - Edit existing websites
   - Duplicate templates
   - Share templates

## Files Changed

- `app/create/page-builder.tsx` - New component for page-wise building
- `app/create/page.tsx` - Updated to use PageBuilder component

## Integration Points

- **Authentication**: Uses NextAuth session
- **Payment**: Will integrate with payment flow
- **Storage**: Ready for Cloudinary integration
- **Database**: Will store as page array in Website model

## Testing

To test the new flow:
1. Navigate to `/create`
2. Select one or both page templates
3. Click "Continue to Build"
4. Fill in content for Page 1
5. Click "Next" to go to Page 2 (if selected)
6. Click "Complete" to finish
7. See success message and redirect to dashboard

## Notes

- Currently in demo mode (no actual upload/save)
- Only 2 templates available for testing
- Can be easily extended with more templates
- Validation ensures all required content is provided
- User can go back to edit previous pages
