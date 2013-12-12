<?php

$assets = json_decode(file_get_contents($container->getParameter('kernel.root_dir').'/config/assets.json'), true);

$container->setParameter('app.assets', $assets);
