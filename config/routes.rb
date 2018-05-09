Rails.application.routes.draw do
  root 'application#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'score/left', to: 'scores#left'
  post 'score/right', to: 'scores#right'
  resources :games, only: [:create, :index] do
    get :current, on: :collection
    delete :destroy, on: :collection
  end

  get '*path', to: 'application#index'

  mount ActionCable.server => '/cable'
end
