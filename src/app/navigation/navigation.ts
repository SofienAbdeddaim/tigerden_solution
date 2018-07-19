export const navigation = [
  {
    'id': 'applications',
    'title': 'Applications',
    'translate': 'NAV.APPLICATIONS',
    'type': 'group',
    'icon': 'apps',
    'children': [
      {
        'id': 'dashboards',
        'title': 'Dashboards',
        'translate': 'NAV.DASHBOARDS',
        'type': 'collapse',
        'icon': 'dashboard',
        'children': [
          {
            'id': 'analytics',
            'title': 'Analytics',
            'type': 'item',
            'url': '/apps/dashboards/analytics'
          },
          {
            'id': 'project',
            'title': 'Project',
            'type': 'item',
            'url': '/apps/dashboards/project'
          }
        ]
      },
      {
        'title': 'Links',
        'type': 'item',
        'icon': 'bookmark',
        'url': '/apps/faq'
      }, // @todo
      {
        'title': 'Client',
        'type': 'item',
        'icon': 'people',
        'url': '/apps/clients'
      }, // @todo
      {
        'id': 'contacts',
        'title': 'Contacts',
        'translate': 'NAV.CONTACTS',
        'type': 'item',
        'icon': 'account_box',
        'url': '/apps/contacts'
      },
      {
        'id': 'calendar',
        'title': 'Calendar',
        'translate': 'NAV.CALENDAR',
        'type': 'item',
        'icon': 'today',
        'url': '/apps/calendar'
      },
      {
        'id': 'mail',
        'title': 'Mail',
        'translate': 'NAV.MAIL.TITLE',
        'type': 'item',
        'icon': 'email',
        'url': '/apps/mail',
        'badge': {
          'title': 25,
          'translate': 'NAV.MAIL.BADGE',
          'bg': '#F44336',
          'fg': '#FFFFFF'
        }
      },
      {
        'id': 'chat',
        'title': 'Chat',
        'translate': 'NAV.CHAT',
        'type': 'item',
        'icon': 'chat',
        'url': '/apps/chat',
        'badge': {
          'title': 13,
          'bg': '#09d261',
          'fg': '#FFFFFF'
        }
      },
      {
        'id': 'to-do',
        'title': 'To-Do',
        'translate': 'NAV.TODO',
        'type': 'item',
        'icon': 'check_box',
        'url': '/apps/todo',
        'badge': {
          'title': 3,
          'bg': '#FF6F00',
          'fg': '#FFFFFF'
        }
      },
      {
        'id': 'scrumboard',
        'title': 'Scrumboard',
        'translate': 'NAV.SCRUMBOARD',
        'type': 'item',
        'icon': 'assessment',
        'url': '/apps/scrumboard'
      },
      {
        'id': 'file-manager',
        'title': 'File Manager',
        'translate': 'NAV.FILE_MANAGER',
        'type': 'item',
        'icon': 'folder',
        'url': '/apps/file-manager'
      },
      {
        'title': 'Faq',
        'type': 'item',
        'icon': 'help',
        'url': '/apps/faq'
      },
      {
        'title': 'Knowledge Base',
        'type': 'item',
        'icon': 'import_contacts',
        'url': '/apps/knowledge-base'
      },
      {
        'title': 'Settings',
        'type': 'item',
        'icon': 'build',
        'url': '/apps/settings'
      }
    ]
  }
];
