// One place that maps services to their photos, so a photo is not used for two services.
// Every stock-*.jpg came from Paul's current site and is STOCK: it may illustrate a service, never be captioned as Paul's work.
import type { ImageMetadata } from 'astro';
import clogged from '../assets/img/source-site/stock-ptrap-wrench.jpg';
import cleaning from '../assets/img/source-site/stock-sink-drain-water.jpg';
import camera from '../assets/img/source-site/stock-drain.jpg';
import sewer from '../assets/img/source-site/stock-green-sewer-pipes.jpg';
import repipe from '../assets/img/source-site/stock-repipe-pipes.jpg';
import leak from '../assets/img/source-site/stock-pipe-torch.jpg';
import gas from '../assets/img/source-site/stock-yellow-gas-pipe.jpg';
import heater from '../assets/img/source-site/stock-water-heater-tech.jpg';
import toilet from '../assets/img/source-site/stock-toilet-tech.jpg';
import disposal from '../assets/img/source-site/stock-garbage-disposal.jpg';
import filter from '../assets/img/source-site/stock-water-filtration.jpg';
import emergency from '../assets/img/source-site/stock-plumber-toolbox.jpg';
import commercial from '../assets/img/source-site/stock-pipes-brick.jpg';

export const SERVICE_IMG: Record<string, { src: ImageMetadata; alt: string }> = {
  'clogged-drain-repair-st-petersburg-fl': { src: clogged, alt: 'Wrench tightening a chrome P-trap under a sink' },
  'drain-cleaning-st-petersburg-fl': { src: cleaning, alt: 'Water running freely down a clean stainless steel sink drain' },
  'drain-camera-inspection-st-petersburg-fl': { src: camera, alt: 'Close view of a sink drain opening' },
  'sewer-line-service-st-petersburg-fl': { src: sewer, alt: 'Stack of green sewer pipes' },
  'repiping-st-petersburg-fl': { src: repipe, alt: 'New water pipes running along a wall' },
  'leak-detection-st-petersburg-fl': { src: leak, alt: 'Plumber soldering a copper pipe joint with a torch' },
  'gas-line-services-st-petersburg-fl': { src: gas, alt: 'Yellow gas pipe fixed to a concrete wall' },
  'water-heater-repair-st-petersburg-fl': { src: heater, alt: 'Technician adjusting the valve on a water heater' },
  'toilet-repair-st-petersburg-fl': { src: toilet, alt: 'Plumber with a toolbox standing next to a toilet' },
  'garbage-disposal-repair-st-petersburg-fl': { src: disposal, alt: 'Garbage disposal unit fitted under a kitchen sink' },
  'water-softeners-filtration-st-petersburg-fl': { src: filter, alt: 'Technician fitting a water filtration system' },
  'emergency-plumber-st-petersburg-fl': { src: emergency, alt: 'Plumber holding a pipe wrench over an open toolbox' },
  'commercial-plumbing-st-petersburg-fl': { src: commercial, alt: 'Commercial pipework and valves on a brick wall' },
};
