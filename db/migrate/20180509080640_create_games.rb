class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.integer :left_team_score, default: 0
      t.integer :right_team_score, default: 0
      t.boolean :finished, default: false


      t.timestamps
    end
  end
end
