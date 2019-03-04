<?php

use Illuminate\Database\Seeder;

class PlantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 0; $i < 5; $i++)
        {
            $name = array(
                1 => "planta1",
                2 => "planta2",
                3 => "planta3",
                4 => "planta4"
            );
            $location = array(
                1 => "HIDALGO",
                2 => "MEXICO",
                3 => "JALISCO",
                4 => "NUEVO-LEON"
            );
            $urli = array(
                1 => "caergaegae",
                2 => "aetheathaect",
                3 => "caehethaecha",
                4 => "jtuktykfhsrjy"
            );
            $key = array(
                1 => "srthrthrthrthsrter",
                2 => "hzergthgfjyxtewzrt",
                3 => "gthrdseryjhtejrgear",
                4 => "gaergrtjsrjrsthrhsth"
            );
    
            $llave = $key[rand(1,4)];
    
            $url = $urli[rand(1,4)];
    
            $localizacion = $location[rand(1,4)];
    
            $nombre = $name[rand(1,4)];
    
            echo $nombre;
    
            $status = rand(0,1);
    
            DB::table('plants')->insert([
                'name' => $nombre,
                'location'=> $localizacion,
                'url'=> $url,
                'key'=> $llave,
                'img'=>'imahrtvathcrjathejg',
                'status'=> $status,            
            ]);
        }
        
    }
}
