Rails.application.routes.draw do
  root 'application#index'
  get '*path', to: 'application#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
