export default ({ app, store, redirect }) => {
    // redirect('/')
    app.router.afterEach((to, from) => {
      
      
        console.log(to)
      const urlList = [
          // {
          //     name: 'request',
          //     permissionType: 'role',
          //     permission: 'student'
          // },
          // {
          //     name: 'cashier',
          //     permissionType: 'role',
          //     permission: 'cashier'
          // },
          // {
          //     name: 'ocs_view',
          //     permissionType: 'role',
          //     permission: 'service provider'
          // },
        //   {
        //     name: 'admin-mentor-assignment-college',
        //     permissionType: 'role',
        //     permission: 'admin'
        // },
        //   ,
        //   {
        //       name: 'student-mentor-assignment',
        //       permissionType: 'role',
        //       permission: 'student'
        //   },
        //   {
        //       name: 'student-consent-of-instructor',
        //       permissionType: 'role',
        //       permission: 'student'
        //   },
        //   {
        //       name: 'faculty-consent-of-instructor',
        //       permissionType: 'role',
        //       permission: 'faculty'
        //   },
        //   {
        //     name: 'admin-consent-of-instructor',
        //     permissionType: 'role',
        //     permission: 'admin'
        //   },
        //   {
        //     name: 'student-prerogative-enrollment',
        //     permissionType: 'role',
        //     permission: 'student'
        //   },
        //   {
        //     name: 'faculty-prerogative-enrollment',
        //     permissionType: 'role',
        //     permission: 'faculty'
        //   },
        //   {
        //     name: 'admin-prerogative-enrollment',
        //     permissionType: 'role',
        //     permission: 'admin'
        //   },
        //   {
        //     name: 'super-admin-download-data',
        //     permissionType: 'role',
        //     permission: 'super_admin'
        //   },
        //   {
        //     name: 'super-admin-permissions-module',
        //     permissionType: 'role',
        //     permission: 'super_admin'
        //   },
        //   {
        //     name: 'super-admin-tags-module',
        //     permissionType: 'role',
        //     permission: 'super_admin'
        //   },
        //   {
        //     name: 'super-admin-users-module',
        //     permissionType: 'role',
        //     permission: 'super_admin'
        //   },
        //   {
        //     name: 'student-ge-coursework',
        //     permissionType: 'role',
        //     permission: 'student'
        //   },
        //   {
        //     name: 'faculty-ge-coursework',
        //     permissionType: 'role',
        //     permission: 'faculty'
        //   },
        //   {
        //     name: 'super-admin-course-offerings-module',
        //     permissionType: 'role',
        //     permission: 'super_admin'
        //   }
      ]
  
      const URLwithoutPermission = [
                                      'index',
                                      'login',
                                      'error'
                                    ]
                                    
      if (store.state.auth.user) {
          if ((URLwithoutPermission).includes(to.name)) {
            return
          }
          const pagePermission =  urlList.filter(o => o.name === to.name)
          if(pagePermission[0].permissionType === 'role'){
             if(checkRole(pagePermission[0].permission) === 0){
              window.location.href = "/error";
             } 
          }else if(checkPermission(pagePermission[0].permission) === 0){
                window.location.href = "/error"
            
          }
      }else if(to.path === "/login"){
            window.location.href = "/auth/login";
        }
        
      
  
      function checkRole (pageRole) {
        const userRoles = store.state.auth.user.roles
        return userRoles.filter(role => role.name === pageRole).length
      }
  
      function checkPermission (moduleName) {
        const userPermissions = store.state.auth.user.permissions
        return userPermissions.filter(permission => permission.name === moduleName).length
      }
    })
  }