# Data Model: Skills Scroller Components

This feature involves structural changes to the inline SVG components within the `index.html` file.

## Entities

### SkillItem
Represents a single skill in the horizontal scroller.
- **Label**: (string) e.g., "Python", "SQL", "Power BI"
- **Icon**: (SVG) The graphical component.
- **InstanceID**: (integer) The unique identifier for this instance in the list (e.g., 1, 2, 3...).

### SVGComponent
The internal structure of the SVG icons.
- **ViewBox**: (string) Must be set to `0 0 110 110` for Python icons.
- **Paths**: (array) The geometry of the icon.
- **Gradients**: (array) The color definitions.
- **UniqueID**: (string) Concatenation of SkillName + InstanceID + Purpose (e.g., `python-grad-1`).

## Relationships
- `Scroller` contains N `SkillItem`s.
- Each `SkillItem` contains 1 `SVGComponent`.
- Each `SVGComponent` must have `Gradients` that reference its `UniqueID`.

## Validation Rules
- All `viewBox` attributes must encompass the min/max coordinates of all child paths.
- No two `linearGradient` elements in the entire `index.html` may share the same `id`.
