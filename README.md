# README

## Launching a Dev environment

This was built to run on Ruby 3.3.5 (I used rbenv as the ruby version manager) and the latest version of ruby on rails and react.

### Launching the server

```
bundle install
yarn install
rails db:migrate:reset
rails s
```

### Running the tests:

```
bundle exec rspec
bundle exec cucumber
```

## Notes on implementation

- Files for the front-end are stored in app/assets/javascript
- For simplicity of the demo, I've used Rails to serve the API and the frontend. In a real-world application, I would have separated the API and the frontend into different codebases to make it easier to manage and scale.
- I stored measurements as a string on the join table between cocktails and ingredients. In a real-world application, I would have created a separate table for measurements and just stored a numerical quantity value in the join table, but I didn't want to spend too much time trying to extract that data from the source file.
- The initial data was loaded in a migration vs. doing it in the seeds file for simplicity.
