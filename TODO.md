## Server Side Updates
- [ ] Update server/src/models/User.ts to add role field (default 'user')
- [ ] Update server/src/controllers/authController.ts to include role in JWT token and responses

## Client Side Updates
- [ ] Update client/src/context/AuthContext.tsx to include role in User interface
- [ ] Create client/src/pages/Admin.tsx page
- [ ] Add /admin route in client/src/App.tsx
- [ ] Add admin icon/button in client/src/components/Hero.tsx (visible only to admins)
- [ ] Update client-side authentication to handle role

## Testing
- [x] Test admin access and icon visibility
- [x] Ensure non-admins cannot access admin page
=======
# TODO: Add Admin Page with Icon from Home Screen

## Server Side Updates
- [x] Update server/src/models/User.ts to add role field (default 'user')
- [x] Update server/src/controllers/authController.ts to include role in JWT token and responses

## Client Side Updates
- [x] Update client/src/context/AuthContext.tsx to include role in User interface
- [x] Create client/src/pages/Admin.tsx page
- [x] Add /admin route in client/src/App.tsx
- [x] Add admin icon/button in client/src/components/Hero.tsx (visible only to admins)
- [x] Update client-side authentication to handle role

## Testing
- [ ] Test admin access and icon visibility
- [ ] Ensure non-admins cannot access admin page
