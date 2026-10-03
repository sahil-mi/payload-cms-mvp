import * as migration_20260922_052139_initial_schema from './20260922_052139_initial_schema'
import * as migration_20261003_113716_seo_fields from './20261003_113716_seo_fields'
import * as migration_20261003_150242_url_redirects_tab from './20261003_150242_url_redirects_tab'

export const migrations = [
  {
    up: migration_20260922_052139_initial_schema.up,
    down: migration_20260922_052139_initial_schema.down,
    name: '20260922_052139_initial_schema',
  },
  {
    up: migration_20261003_113716_seo_fields.up,
    down: migration_20261003_113716_seo_fields.down,
    name: '20261003_113716_seo_fields',
  },
  {
    up: migration_20261003_150242_url_redirects_tab.up,
    down: migration_20261003_150242_url_redirects_tab.down,
    name: '20261003_150242_url_redirects_tab',
  },
]
