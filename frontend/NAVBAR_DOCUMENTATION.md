# FOSSEE Workshops - Modern React Navbar

## Overview

This is a complete redesign of the FOSSEE Workshops navbar from Django templates to a modern React frontend. The implementation maintains **exact same functionality and navigation logic** as the original Django navbar while providing a significantly improved UI/UX.

## Key Features

### ✅ Functional Requirements (Preserved from Django)

1. **Fixed/Sticky Navigation** - Navbar remains at the top while scrolling
2. **Brand/Logo** - "FOSSEE Workshops" links to homepage
3. **Role-Based Navigation**:
   - **Guest Users**: Home, Workshop Statistics
   - **Authenticated Users**: Workshop Status, Workshop Types
   - **Instructors**: + Team Statistics
   - **Coordinators**: + Propose Workshop
4. **User Dropdown**: Profile, Change Password, Logout
5. **Responsive Design**: Hamburger menu on mobile
6. **User Name Display**: Shows full name in navbar

### ✨ UI/UX Improvements

1. **Modern SaaS Design** - Clean, minimal, professional aesthetic
2. **Soft Shadows & Spacing** - Subtle depth and breathing room
3. **Smooth Transitions** - All interactions feel polished
4. **Active Link Highlighting** - Clear visual feedback for current page
5. **Icon Integration** - SVG icons for better visual communication
6. **Avatar System** - Colorful user avatars with initials
7. **Scroll Effects** - Navbar shadow intensifies on scroll
8. **Mobile-First** - Touch-friendly with smooth animations

## Component Structure

```
frontend/src/
├── components/
│   ├── Navbar.jsx          # Main navbar component
│   ├── Navbar.css          # Navbar styles
│   ├── UserDropdown.jsx    # User menu dropdown
│   ├── UserDropdown.css    # Dropdown styles
│   ├── MobileMenu.jsx      # Mobile navigation panel
│   └── MobileMenu.css      # Mobile menu styles
├── App.jsx                 # Main app with demo
├── App.css                 # App layout styles
├── index.css               # Global styles & CSS variables
└── main.jsx               # React entry point
```

## Navigation Logic

### Guest Users (Not Authenticated)

```javascript
[
  { name: "Home", href: "/", icon: "home" },
  { name: "Workshop Statistics", href: "/statistics/public", icon: "stats" },
];
```

### Instructors (Authenticated + Instructor Role)

```javascript
[
  { name: "Workshop Status", href: "/workshop/status", icon: "status" },
  { name: "Workshop Types", href: "/workshop/types", icon: "types" },
  { name: "Team Statistics", href: "/statistics/team", icon: "team" },
];
```

### Coordinators (Authenticated + Not Instructor)

```javascript
[
  { name: "Workshop Status", href: "/workshop/status", icon: "status" },
  { name: "Workshop Types", href: "/workshop/types", icon: "types" },
  { name: "Propose Workshop", href: "/workshop/propose", icon: "propose" },
];
```

## CSS Design System

### Color Palette

```css
--color-primary: #2563eb; /* Blue */
--color-primary-light: #eff6ff; /* Light blue bg */
--color-text-primary: #111827; /* Dark gray */
--color-text-secondary: #6b7280; /* Medium gray */
--color-bg-hover: #f9fafb; /* Light gray hover */
```

### Typography

```css
--font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
```

### Spacing Scale

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
```

### Border Radius

```css
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
```

## Responsive Breakpoints

- **Desktop**: > 900px - Full navigation visible
- **Tablet**: ≤ 900px - Hamburger menu appears
- **Mobile**: ≤ 480px - Optimized for small screens

## Usage Examples

### Basic Usage

```jsx
import Navbar from "./components/Navbar";

function App() {
  const user = {
    isAuthenticated: true,
    role: "instructor",
    name: "Dr. John Doe",
  };

  return (
    <div>
      <Navbar user={user} currentPage="/workshop/status" />
      {/* Your content here */}
    </div>
  );
}
```

### User State Configurations

```javascript
// Guest User
const guestUser = {
  isAuthenticated: false,
  role: null,
  name: "Guest User",
};

// Instructor
const instructorUser = {
  isAuthenticated: true,
  role: "instructor",
  name: "Dr. John Doe",
};

// Coordinator
const coordinatorUser = {
  isAuthenticated: true,
  role: "coordinator",
  name: "Jane Smith",
};
```

## Testing the Navbar

The App.jsx includes a demo interface to test all navbar states:

1. **Switch User Roles** - Toggle between Guest, Instructor, and Coordinator
2. **Navigate Pages** - Click to test active link highlighting
3. **Scroll Behavior** - Scroll down to see shadow effects
4. **Mobile View** - Resize browser to test responsive design

### Running the Demo

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5176` in your browser.

## Accessibility Features

- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ High contrast mode support
- ✅ Reduced motion support

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

1. **CSS Variables** - No runtime style calculations
2. **CSS Transitions** - GPU-accelerated animations
3. **Lazy Loading** - Mobile menu only renders when needed
4. **Event Delegation** - Efficient event handling
5. **Minimal Re-renders** - Optimized React components

## User Roles & Registration Flow

### How Users Become Instructors vs Coordinators

In the FOSSEE Workshops system, there are **two user roles**:

1. **Coordinator** - Organizes and proposes workshops
2. **Instructor** - Conducts and manages workshops

### Registration Process

All users register through a **single registration form** (`/register`) called the "Coordinator Registration Form". During registration, users select their **position** which determines their role:

```python
# From workshop_app/models.py
position_choices = (
    ("coordinator", "Coordinator"),
    ("instructor", "Instructor")
)

position = models.CharField(
    max_length=32,
    choices=position_choices,
    default='coordinator',  # Default is coordinator
    help_text='Select Coordinator if you want to organise a workshop...'
)
```

### How Someone Becomes an Instructor

There are **three ways** a user can have instructor privileges:

1. **During Registration** - Select "Instructor" as their position in the registration form
2. **Django Groups** - Admin adds user to the "instructor" Django group
3. **Admin Promotion** - A coordinator can be promoted to instructor by an admin

### Role Detection in Django

The system checks if a user is an instructor using:

```python
# From workshop_app/views.py
def is_instructor(user):
    """Check if the user is having instructor rights"""
    return user.groups.filter(name='instructor').exists()
```

### Navigation Differences

| Feature             | Guest | Coordinator | Instructor |
| ------------------- | ----- | ----------- | ---------- |
| Home                | ✓     | ✓           | ✓          |
| Workshop Statistics | ✓     | ✓           | ✓          |
| Workshop Status     | ✗     | ✓           | ✓          |
| Workshop Types      | ✗     | ✓           | ✓          |
| Propose Workshop    | ✗     | ✓           | ✗          |
| Team Statistics     | ✗     | ✗           | ✓          |

## Integration with Django Backend

To integrate this navbar with your Django backend:

1. **Replace Mock User Data** with actual Django user data
2. **Update API Endpoints** to match your Django URLs
3. **Handle Authentication** via Django REST Framework or sessions
4. **Map User Groups** to determine instructor/coordinator roles

### Example Integration

```javascript
// Fetch user data from Django backend
const fetchUser = async () => {
  const response = await fetch("/api/user/");
  const userData = await response.json();

  return {
    isAuthenticated: userData.is_authenticated,
    role: userData.groups?.includes("instructor")
      ? "instructor"
      : "coordinator",
    position: userData.profile?.position || "coordinator",
    name: userData.get_full_name,
  };
};
```

### Django API Response Structure

```python
# Example Django REST Framework serializer
class UserSerializer(serializers.ModelSerializer):
    position = serializers.CharField(source='profile.position', read_only=True)
    groups = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name',
                  'is_authenticated', 'position', 'groups']

    def get_groups(self, obj):
        return list(obj.groups.values_list('name', flat=True))
```

## Migration Checklist

- [x] Preserve all navigation logic from Django
- [x] Maintain role-based conditional rendering
- [x] Keep user dropdown functionality
- [x] Implement responsive mobile menu
- [x] Add smooth animations and transitions
- [x] Create modern SaaS-style design
- [x] Ensure accessibility compliance
- [x] Optimize for performance
- [x] Document component usage
- [x] Provide testing interface

## Future Enhancements

Potential improvements for future iterations:

1. **Dark Mode** - Add dark theme support
2. **Notifications** - Bell icon with notification count
3. **Search** - Global search functionality
4. **Multi-language** - i18n support
5. **Keyboard Shortcuts** - Quick navigation keys
6. **Offline Support** - PWA capabilities

## Support

For issues or questions:

- Check the demo in App.jsx
- Review component prop types
- Inspect CSS variables in browser dev tools
- Test different user roles using the demo controls

---

**Built with React + CSS (No Tailwind)**  
**Designed for FOSSEE Workshops, IIT Bombay**
